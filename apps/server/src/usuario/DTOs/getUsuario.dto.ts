import { IsEmail, IsString, MaxLength } from "class-validator"

export class GetUsuarioDTO {
  @IsString()
  @MaxLength(100)
  nome: string

  @IsString()
  @MaxLength(100)
  sobrenome: string

  @IsEmail()
  @MaxLength(100)
  email: string
}
