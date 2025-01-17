import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { endOfDay, startOfDay, subDays } from "date-fns"
import { Alimento } from "src/alimentos/alimentos.entity"
import { Usuario } from "src/usuario/usuario.entity"
import { Between, Repository } from "typeorm"

import { CreateRefeicaoDto } from "./DTOs/criaRefeicao.dto"
import { RefeicaoDiariaDto } from "./DTOs/refeicaoDiaria.dto"
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

  async getUltimaRefeicao(idUsuario: number): Promise<UltimaRefeicaoDTO | void> {
    const refeicao = await this.refeicaoRepository.findOne({
      where: { usuario: { id: idUsuario } },
      order: { horaRefeicao: "desc" },
      relations: ["alimentos", "usuario"]
    })

    if (!refeicao) {
      return null
    }

    const alimentos = await this.refeicaoAlimentoRepository.find({
      where: { refeicao: { id: refeicao.id } },
      relations: ["alimento"]
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

  async getRefeicaoDiaria(idUsuario: number): Promise<RefeicaoDiariaDto> {
    const hojeInicio = startOfDay(new Date())
    const hojeFim = endOfDay(new Date())

    const refeicoes = await this.refeicaoRepository.find({
      where: {
        usuario: { id: idUsuario },
        horaRefeicao: Between(hojeInicio, hojeFim)
      },
      order: { horaRefeicao: "desc" },
      relations: ["alimentos", "usuario"]
    })

    const refeicoesNomes: string[] = []
    const refeicoesCalorias: number[] = []
    let totalCaloricoDiario = 0

    for (const refeicao of refeicoes) {
      const alimentos = await this.refeicaoAlimentoRepository.find({
        where: { refeicao: { id: refeicao.id } },
        relations: ["alimento"]
      })

      const caloriasRefeicao = alimentos.reduce((total, item) => {
        if (!item.alimento || item.alimento.calorias === undefined) {
          return total
        }
        const caloriasPorQuantidade = (item.quantidade / 100) * item.alimento.calorias
        return total + caloriasPorQuantidade
      }, 0)

      totalCaloricoDiario += caloriasRefeicao

      refeicoesNomes.push(refeicao.tipoRefeicao)
      refeicoesCalorias.push(caloriasRefeicao)
    }

    const refeicaoDiariaDto: RefeicaoDiariaDto = {
      refeicoes: refeicoesNomes,
      calorias: refeicoesCalorias,
      totalCalorais: totalCaloricoDiario
    }

    return refeicaoDiariaDto
  }

  async getRefeicaoSemanal(
    idUsuario: number
  ): Promise<[number, number, number, number, number, number, number]> {
    const hoje = new Date()
    const diasDaSemana = Array.from({ length: 7 }, (_, i) => subDays(hoje, 6 - i))

    const caloriasPorDia = await Promise.all(
      diasDaSemana.map(async (dia) => {
        const inicioDia = startOfDay(dia)
        const fimDia = endOfDay(dia)

        const refeicoes = await this.refeicaoRepository.find({
          where: {
            usuario: { id: idUsuario },
            horaRefeicao: Between(inicioDia, fimDia)
          },
          relations: ["alimentos", "usuario"]
        })

        let totalCalorias = 0

        for (const refeicao of refeicoes) {
          const alimentos = await this.refeicaoAlimentoRepository.find({
            where: { refeicao: { id: refeicao.id } },
            relations: ["alimento"]
          })

          const caloriasRefeicao = alimentos.reduce((total, item) => {
            if (!item.alimento || item.alimento.calorias === undefined) {
              return total
            }
            const caloriasPorQuantidade = (item.quantidade / 100) * item.alimento.calorias
            return total + caloriasPorQuantidade
          }, 0)

          totalCalorias += caloriasRefeicao
        }

        return totalCalorias
      })
    )

    return caloriasPorDia as [number, number, number, number, number, number, number]
  }
}
