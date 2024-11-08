import { TipoRefeicao } from "../tipoRefeicao.enum"

export class UltimaRefeicaoDTO {
  tipoRefeicao: TipoRefeicao

  alimentos: string[]

  totalCaloria: number

  hora: Date
}
