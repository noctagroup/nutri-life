import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { endOfDay, startOfDay } from "date-fns"
import { Usuario } from "src/usuario/usuario.entity"
import { Between } from "typeorm"
import { Repository } from "typeorm/repository/Repository"

import { Passos } from "./passos.entity"

@Injectable()
export class PassosService {
  constructor(
    @InjectRepository(Passos)
    private readonly passosRepository: Repository<Passos>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) {}

  async contarPassosDiarios(idUsuario: number): Promise<number> {
    const hojeInicio = startOfDay(new Date())
    const hojeFim = endOfDay(new Date())

    const passos =
      (await this.passosRepository.count({
        where: { usuario: { id: idUsuario }, adicionadoEm: Between(hojeInicio, hojeFim) }
      })) * 10

    return passos
  }
  async adicionarPassos(idUsuario: number) {
    const usuario = await this.usuarioRepository.findOne({ where: { id: idUsuario } })

    const passos = new Passos()
    passos.adicionadoEm = new Date()
    passos.usuario = usuario

    await this.passosRepository.save(passos)
  }
}
