import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsuarioModule } from "src/usuario/usuario.module"

import { PassosController } from "./passos.controller"
import { Passos } from "./passos.entity"
import { PassosService } from "./passos.service"

@Module({
  imports: [TypeOrmModule.forFeature([Passos]), UsuarioModule],
  controllers: [PassosController],
  providers: [PassosService]
})
export class PassosModule {}
