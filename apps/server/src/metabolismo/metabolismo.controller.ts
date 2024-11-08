import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  Req,
  UnauthorizedException,
  UseGuards
} from "@nestjs/common"
import { AnamneseService } from "src/anamnese/anamnese.service"
import { AuthGuard } from "src/auth/auth.guard"
import { AuthenticatedRequest } from "src/auth/authenticatedRequest.dto"
import { UsuarioService } from "src/usuario/usuario.service"

import { MetabolismoService } from "./metabolismo.service"

@Controller("metabolismo")
export class MetabolismoController {
  constructor(
    private readonly metabolismoService: MetabolismoService,
    private readonly anamneseService: AnamneseService,
    private readonly usuarioService: UsuarioService
  ) {}

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Get()
  async calculaMetabolismoBasal(@Req() req: AuthenticatedRequest): Promise<number> {
    const idUsuario = req.user.sub

    const usuario = await this.usuarioService.buscaUsuarioId(idUsuario)

    if (!usuario) {
      throw new UnauthorizedException()
    }

    const ultimaAnamnese = await this.anamneseService.pegaUltimaAnamneseIdUsuario(usuario.id)

    if (!ultimaAnamnese) {
      throw new HttpException("Anamnese não feita pelo usuário", 500)
    }

    const tmb = await this.metabolismoService.calculaMetabolismoBasal(ultimaAnamnese)

    return tmb
  }
}
