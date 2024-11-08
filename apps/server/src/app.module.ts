import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm"

import { Alimento } from "./alimentos/alimentos.entity"
import { AlimentosModule } from "./alimentos/alimentos.module"
import { Anamnese } from "./anamnese/anamnese.entity"
import { AnamneseModule } from "./anamnese/anamnese.module"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AuthModule } from "./auth/auth.module"
import { MetabolismoModule } from "./metabolismo/metabolismo.module"
import { Refeicao } from "./refeicao/refeicao.entity"
import { RefeicaoModule } from "./refeicao/refeicao.module"
import { RefeicaoAlimento } from "./refeicao/refeicaoAlimento.entity"
import { Usuario } from "./usuario/usuario.entity"
import { UsuarioModule } from "./usuario/usuario.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: "postgres",
        host: configService.get<string>("DB_HOST"),
        port: +configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_NAME"),
        entities: [Alimento, Usuario, Anamnese, Refeicao, RefeicaoAlimento],
        synchronize: true
      })
    }),
    AlimentosModule,
    AuthModule,
    UsuarioModule,
    AnamneseModule,
    RefeicaoModule,
    MetabolismoModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
