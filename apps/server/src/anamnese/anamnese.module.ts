import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsuarioModule } from "src/usuario/usuario.module"

import { AnamneseController } from "./anamnese.controller"
import { Anamnese } from "./anamnese.entity"
import { AnamneseService } from "./anamnese.service"

@Module({
  imports: [TypeOrmModule.forFeature([Anamnese]), UsuarioModule],
  controllers: [AnamneseController],
  providers: [AnamneseService],
  exports: [AnamneseService, TypeOrmModule]
})
export class AnamneseModule {}
