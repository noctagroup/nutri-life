import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common"
import { AuthGuard } from "src/auth/auth.guard"
import { AuthenticatedRequest } from "src/auth/authenticatedRequest.dto"

import { CreateRefeicaoDto } from "./DTOs/criaRefeicao.dto"
import { RefeicaoService } from "./refeicao.service"

@Controller("refeicao")
export class RefeicaoController {
  constructor(private readonly refeicaoService: RefeicaoService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createRefeicao(
    @Req() req: AuthenticatedRequest,
    @Body() createRefeicaoDto: CreateRefeicaoDto
  ) {
    return await this.refeicaoService.createRefeicao(createRefeicaoDto, req.user.sub)
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async getRefeicao(@Req() req: AuthenticatedRequest, @Param("id") id: number) {
    return await this.refeicaoService.getRefeicaoById(id, req.user.sub)
  }
}
