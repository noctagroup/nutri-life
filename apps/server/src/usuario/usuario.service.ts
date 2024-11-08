import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import * as bcrypt from "bcryptjs"
import { Repository } from "typeorm"

import { CriaUsuarioDTO } from "./DTOs/criaUsuario.dto"
import { Usuario } from "./usuario.entity"

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repository: Repository<Usuario>
  ) {}

  // Metodo para criar um usuario novo
  async criaUsuario(usuario: CriaUsuarioDTO): Promise<Usuario> {
    usuario.senha = await bcrypt.hash(usuario.senha, 10)
    const novoUsuario = this.repository.create(usuario)
    const usuarioSalvo = await this.repository.save(novoUsuario)

    // Remover a senha do objeto antes de retornar
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha, ...resultadoSemSenha } = usuarioSalvo
    return resultadoSemSenha as Usuario
  }

  async buscaUsuarioEmail(email: string): Promise<Usuario> {
    return await this.repository.findOne({ where: { email: email } })
  }

  async buscaUsuarioId(id: number): Promise<Usuario> {
    const usuario = await this.repository.findOne({ where: { id: id } })

    if (!usuario) {
      throw new NotFoundException()
    }

    return usuario
  }
}
