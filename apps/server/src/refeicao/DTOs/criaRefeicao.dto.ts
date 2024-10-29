import { Type } from "class-transformer"
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator"

import { TipoRefeicao } from "../tipoRefeicao.enum"

class RefeicaoAlimentoDTO {
  @IsNotEmpty()
  @IsNumber()
  alimentoId: number

  @IsNotEmpty()
  @IsNumber()
  quantity: number
}

export class CreateRefeicaoDto {
  @IsNotEmpty()
  @IsString()
  time: string

  @IsEnum(TipoRefeicao)
  @IsNotEmpty()
  type: TipoRefeicao

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RefeicaoAlimentoDTO)
  alimentos: RefeicaoAlimentoDTO[]
}
