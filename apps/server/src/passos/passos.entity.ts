import { Usuario } from "src/usuario/usuario.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Passos {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "text", default: () => "CURRENT_TIMESTAMP" })
  adicionadoEm: Date

  @ManyToOne(() => Usuario, (usuario) => usuario.anamnese)
  usuario: Usuario
}
