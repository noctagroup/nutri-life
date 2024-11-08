import { Injectable } from "@nestjs/common"
import { Anamnese } from "src/anamnese/anamnese.entity"
import { AtividadeFisica, Genero, Objetivo } from "src/anamnese/anamnese.enum"

@Injectable()
export class MetabolismoService {
  private constMasculino = 88.36
  private constFeminino = 447.6

  async calculaMetabolismoBasal(ultimaAnamnese: Anamnese): Promise<number> {
    const alturaCm = ultimaAnamnese.altura
    const idade = this.calcularIdade(ultimaAnamnese.dataNasc)
    let taxaMetabolismo: number

    if (ultimaAnamnese.genero === Genero.MASCULINO) {
      taxaMetabolismo =
        this.constMasculino + 13.4 * ultimaAnamnese.pesoAtual + 4.8 * alturaCm - 5.7 * idade
    } else {
      taxaMetabolismo =
        this.constFeminino + 9.2 * ultimaAnamnese.pesoAtual + 3.1 * alturaCm - 4.3 * idade
    }

    let metabolismoAjustado: number
    switch (ultimaAnamnese.atividadeFisica) {
      case AtividadeFisica.LEVE:
        metabolismoAjustado = taxaMetabolismo * 1.375
        break
      case AtividadeFisica.MODERADA:
        metabolismoAjustado = taxaMetabolismo * 1.55
        break
      case AtividadeFisica.INTENSA:
        metabolismoAjustado = taxaMetabolismo * 1.725
        break
      default:
        throw new Error("Nível de atividade física inválido")
    }

    switch (ultimaAnamnese.objetivo) {
      case Objetivo.EMAGRECER:
        return metabolismoAjustado * 0.85
      case Objetivo.MANTER_PESO:
        return metabolismoAjustado
      case Objetivo.GANHAR_PESO:
        return metabolismoAjustado * 1.15
      default:
        throw new Error("Objetivo inválido")
    }
  }

  private calcularIdade(dataNascimento: Date | string): number {
    let dataNasc: Date
    if (typeof dataNascimento === "string") {
      const cleanDate = dataNascimento.split(".")[0].replace(" ", "T")
      dataNasc = new Date(cleanDate)
    } else {
      dataNasc = new Date(dataNascimento)
    }

    const hoje = new Date()
    let idade = hoje.getFullYear() - dataNasc.getFullYear()

    const mesAtual = hoje.getMonth()
    const diaAtual = hoje.getDate()

    const mesNascimento = dataNasc.getMonth()
    const diaNascimento = dataNasc.getDate()

    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
      idade--
    }

    return idade
  }
}
