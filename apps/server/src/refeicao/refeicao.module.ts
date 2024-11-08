import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AlimentosModule } from "src/alimentos/alimentos.module"
import { AlimentosService } from "src/alimentos/alimentos.service"
import { UsuarioModule } from "src/usuario/usuario.module"
import { UsuarioService } from "src/usuario/usuario.service"

import { RefeicaoController } from "./refeicao.controller"
import { Refeicao } from "./refeicao.entity"
import { RefeicaoService } from "./refeicao.service"
import { RefeicaoAlimento } from "./refeicaoAlimento.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Refeicao, RefeicaoAlimento]), UsuarioModule, AlimentosModule],
  controllers: [RefeicaoController],
  providers: [RefeicaoService, UsuarioService, AlimentosService]
})
export class RefeicaoModule {}
