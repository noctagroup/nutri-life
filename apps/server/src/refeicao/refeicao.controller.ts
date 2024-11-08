import { Body, Controller, Get, HttpStatus, Param, Post, Req, UseGuards } from "@nestjs/common"
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
    const ultimaRefeicao = await this.refeicaoService.getUltimaRefeicao(idUsuario)

    if (!ultimaRefeicao) {
      return {
        statusCode: HttpStatus.NO_CONTENT
      }
    }

    return ultimaRefeicao
  }

  @UseGuards(AuthGuard)
  @Get("/diaria")
  async getRefeicoesDiaria(@Req() req: AuthenticatedRequest) {
    const idUsuario = req.user.sub

    return await this.refeicaoService.getRefeicaoDiaria(idUsuario)
  }

  @UseGuards(AuthGuard)
  @Get("/semanal")
  async getRefeicoesSemanal(@Req() req: AuthenticatedRequest) {
    const idUsuario = req.user.sub

    return await this.refeicaoService.getRefeicaoSemanal(idUsuario)
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async getRefeicao(@Req() req: AuthenticatedRequest, @Param("id") id: number) {
    return await this.refeicaoService.getRefeicaoById(id, req.user.sub)
  }
}
