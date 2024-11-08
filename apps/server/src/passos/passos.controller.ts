import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common"
import { AuthGuard } from "src/auth/auth.guard"
import { AuthenticatedRequest } from "src/auth/authenticatedRequest.dto"

import { PassosService } from "./passos.service"

@Controller("passos")
export class PassosController {
  constructor(private readonly passosService: PassosService) {}

  @UseGuards(AuthGuard)
  @Post()
  async adicionarPassos(@Req() req: AuthenticatedRequest) {
    const userId = req.user.sub

    return await this.passosService.adicionarPassos(userId)
  }

  @UseGuards(AuthGuard)
  @Get()
  async getPassosDiario(@Req() req: AuthenticatedRequest) {
    const userId = req.user.sub

    return await this.passosService.contarPassosDiarios(userId)
  }
}
