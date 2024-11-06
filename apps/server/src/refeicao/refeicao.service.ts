import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Alimento } from "src/alimentos/alimentos.entity"
import { Usuario } from "src/usuario/usuario.entity"
import { Repository } from "typeorm"

import { CreateRefeicaoDto } from "./DTOs/criaRefeicao.dto"
import { UltimaRefeicaoDTO } from "./DTOs/ultimaRefeicao"
import { Refeicao } from "./refeicao.entity"
import { RefeicaoAlimento } from "./refeicaoAlimento.entity"

@Injectable()
export class RefeicaoService {
  constructor(
    @InjectRepository(Refeicao)
    private readonly refeicaoRepository: Repository<Refeicao>,
    @InjectRepository(RefeicaoAlimento)
    private readonly refeicaoAlimentoRepository: Repository<RefeicaoAlimento>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Alimento)
    private readonly alimentoRepository: Repository<Alimento>
  ) {}

  async createRefeicao(dto: CreateRefeicaoDto, usuario: Usuario): Promise<void> {
    const refeicao = new Refeicao()
    refeicao.horaRefeicao = new Date(dto.time)
    refeicao.tipoRefeicao = dto.type
    refeicao.usuario = usuario

    const alimentos = await Promise.all(
      dto.alimentos.map(async (alimentoDTO) => {
        const alimento = await this.alimentoRepository.findOne({
          where: { id: alimentoDTO.alimentoId }
        })
        if (!alimento) {
          throw new Error(`Alimento with id ${alimentoDTO.alimentoId} not found`)
        }

        const refeicaoAlimento = new RefeicaoAlimento()
        refeicaoAlimento.alimento = alimento
        refeicaoAlimento.quantidade = alimentoDTO.quantity
        refeicaoAlimento.refeicao = refeicao

        return refeicaoAlimento
      })
    )

    await this.refeicaoRepository.save(refeicao)

    await this.refeicaoAlimentoRepository.save(alimentos)
  }

  async getRefeicaoById(idRefeicao: number, idUsuario: number): Promise<Refeicao> {
    return this.refeicaoRepository.findOne({
      where: { id: idRefeicao, usuario: { id: idUsuario } },
      relations: ["alimentos", "usuario"]
    })
  }

  async getUltimaRefeicao(idUsuario: number): Promise<UltimaRefeicaoDTO> {
    const refeicao = await this.refeicaoRepository.findOne({
      where: { usuario: { id: idUsuario } },
      order: { horaRefeicao: "desc" }
    })

    if (!refeicao) {
      throw new NotFoundException("Nenhuma refeição encontrada para esse usuário.")
    }

    const alimentos = await this.refeicaoAlimentoRepository.find({
      where: { refeicao: { id: refeicao.id } }
    })

    const totalCalorias = alimentos.reduce((total, item) => {
      if (!item.alimento || item.alimento.calorias === undefined) {
        return total
      }
      const caloriasPorQuantidade = (item.quantidade / 100) * item.alimento.calorias
      return total + caloriasPorQuantidade
    }, 0)

    const nomeAlimentos = alimentos
      .filter((item) => item.alimento)
      .map((item) => item.alimento.alimento)

    const ultimaRefeicao: UltimaRefeicaoDTO = {
      tipoRefeicao: refeicao.tipoRefeicao,
      alimentos: nomeAlimentos,
      totalCaloria: totalCalorias,
      hora: refeicao.horaRefeicao
    }

    return ultimaRefeicao
  }
}
