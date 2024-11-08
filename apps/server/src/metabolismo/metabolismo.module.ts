import { Module } from "@nestjs/common"
import { AnamneseModule } from "src/anamnese/anamnese.module"
import { AnamneseService } from "src/anamnese/anamnese.service"
import { UsuarioModule } from "src/usuario/usuario.module"
import { UsuarioService } from "src/usuario/usuario.service"

import { MetabolismoController } from "./metabolismo.controller"
import { MetabolismoService } from "./metabolismo.service"

@Module({
  imports: [AnamneseModule, UsuarioModule],
  providers: [MetabolismoService, AnamneseService, UsuarioService],
  controllers: [MetabolismoController]
})
export class MetabolismoModule {}
