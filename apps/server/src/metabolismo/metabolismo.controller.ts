import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
  async calculaMetabolismoBasal(@Req() req: AuthenticatedRequest) {
    const idUsuario = req.user.sub

    const usuario = await this.usuarioService.buscaUsuarioId(idUsuario)

    if (!usuario) {
      throw new UnauthorizedException()
    }

    const ultimaAnamnese = await this.anamneseService.pegaUltimaAnamneseIdUsuario(usuario.id)

    if (!ultimaAnamnese) {
      return {
        statusCode: HttpStatus.NO_CONTENT
      }
    }

    const tmb = await this.metabolismoService.calculaMetabolismoBasal(ultimaAnamnese)

    return tmb
  }
}
