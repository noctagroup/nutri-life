import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Alimento } from "src/alimentos/alimentos.entity"
import { Usuario } from "src/usuario/usuario.entity"
import { Repository } from "typeorm"

import { CreateRefeicaoDto } from "./DTOs/criaRefeicao.dto"
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

  async createRefeicao(dto: CreateRefeicaoDto, idUsuario: number): Promise<void> {
    const usuario = await this.usuarioRepository.findOne({ where: { id: idUsuario } })
    if (!usuario) {
      throw new Error("User not found")
    }

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
}
