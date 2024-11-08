import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common"
import { AlimentosService } from "src/alimentos/alimentos.service"
import { AuthGuard } from "src/auth/auth.guard"
import { AuthenticatedRequest } from "src/auth/authenticatedRequest.dto"
import { UsuarioService } from "src/usuario/usuario.service"

import { CreateRefeicaoDto } from "./DTOs/criaRefeicao.dto"
import { RefeicaoService } from "./refeicao.service"

@Controller("refeicao")
export class RefeicaoController {
  constructor(
    private readonly refeicaoService: RefeicaoService,
    private readonly usuarioService: UsuarioService,
    private readonly alimentoRepository: AlimentosService
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async createRefeicao(
    @Req() req: AuthenticatedRequest,
    @Body() createRefeicaoDto: CreateRefeicaoDto
  ) {
    const userId = req.user.sub
    const usuario = await this.usuarioService.buscaUsuarioId(userId)

    return await this.refeicaoService.createRefeicao(createRefeicaoDto, usuario)
  }

  @UseGuards(AuthGuard)
  @Get("/ultima")
  async getUltimaRefeicao(@Req() req: AuthenticatedRequest) {
    const idUsuario = req.user.sub

    return await this.refeicaoService.getUltimaRefeicao(idUsuario)
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async getRefeicao(@Req() req: AuthenticatedRequest, @Param("id") id: number) {
    return await this.refeicaoService.getRefeicaoById(id, req.user.sub)
  }
}
