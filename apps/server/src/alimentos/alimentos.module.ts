import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthModule } from "src/auth/auth.module"

import { AlimentosController } from "./alimentos.controller"
import { Alimento } from "./alimentos.entity"
import { AlimentosService } from "./alimentos.service"

@Module({
  imports: [TypeOrmModule.forFeature([Alimento]), AuthModule],
  providers: [AlimentosService],
  controllers: [AlimentosController],
  exports: [AlimentosService, TypeOrmModule]
})
export class AlimentosModule {}
