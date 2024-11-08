import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common"
import { AuthGuard } from "src/auth/auth.guard"
import { AuthenticatedRequest } from "src/auth/authenticatedRequest.dto"

import { CriaUsuarioDTO } from "./DTOs/criaUsuario.dto"
import { GetUsuarioDTO } from "./DTOs/getUsuario.dto"
import { Usuario } from "./usuario.entity"
import { UsuarioService } from "./usuario.service"

@Controller("usuario")
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  criaUsuario(@Body() usuario: CriaUsuarioDTO): Promise<Usuario> {
    return this.usuarioService.criaUsuario(usuario)
  }

  @UseGuards(AuthGuard)
  @Get()
  async getUsuario(@Req() req: AuthenticatedRequest): Promise<GetUsuarioDTO> {
    const usuarioId = req.user.sub

    const usuario = await this.usuarioService.buscaUsuarioId(usuarioId)

    return {
      nome: usuario.nome,
      sobrenome: usuario.sobrenome,
      email: usuario.email
    }
  }
}
