import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Usuario } from "src/usuario/usuario.entity"
import { Repository } from "typeorm"

import { Anamnese } from "./anamnese.entity"
import { CriaAnamneseDTO } from "./DTOs/anamnese.dto"

@Injectable()
export class AnamneseService {
  constructor(
    @InjectRepository(Anamnese)
    private readonly repository: Repository<Anamnese>
  ) {}

  // Metodo para inserir uma nova anmnese
  async insertAnamnese(usuario: Usuario, criaAnamnese: CriaAnamneseDTO): Promise<Anamnese> {
    const novaAnamnese = this.repository.create({ ...criaAnamnese, usuario: usuario })
    return this.repository.save(novaAnamnese)
  }

  // Procura por anamnese ja existente
  async achaAnamnesesDuplicadas(
    criaAnamneseDTO: CriaAnamneseDTO,
    usuario: Usuario
  ): Promise<Anamnese | undefined> {
    return this.repository.findOne({
      where: {
        dataNasc: criaAnamneseDTO.dataNasc,
        genero: criaAnamneseDTO.genero,
        pesoAtual: criaAnamneseDTO.pesoAtual,
        altura: criaAnamneseDTO.altura,
        objetivo: criaAnamneseDTO.objetivo,
        atividadeFisica: criaAnamneseDTO.atividadeFisica,
        usuario: usuario
      }
    })
  }

  async temAnamnese(userId: number): Promise<boolean> {
    const anamnese = await this.repository.findOne({
      where: {
        usuario: {
          id: userId
        }
      }
    })

    return !!anamnese
  }

  async pegaUltimaAnamneseIdUsuario(userId: number): Promise<Anamnese | void> {
    const ultimaAnamnese: Anamnese = await this.repository.findOne({
      where: {
        usuario: {
          id: userId
        }
      },
      order: {
        feitoEm: "DESC"
      }
    })

    return ultimaAnamnese
  }
}
