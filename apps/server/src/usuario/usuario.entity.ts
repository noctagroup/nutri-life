import { Anamnese } from "src/anamnese/anamnese.entity"
import { Passos } from "src/passos/passos.entity"
import { Refeicao } from "src/refeicao/refeicao.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity()
@Unique(["email"])
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100 })
  nome: string

  @Column({ length: 100 })
  sobrenome: string

  @Column({ length: 100 })
  email: string

  @Column({ length: 100 })
  senha: string

  @OneToMany(() => Anamnese, (anamnese) => anamnese.usuario)
  anamnese: Anamnese[]

  @OneToMany(() => Refeicao, (refeicao) => refeicao.usuario)
  refeicao: Refeicao

  @OneToMany(() => Passos, (passos) => passos.usuario)
  passos: Passos[]
}
