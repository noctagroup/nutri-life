import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { PieChart } from "react-native-svg-charts"

// Definição do tipo de dado para os itens do gráfico
interface PieChartData {
  key: number
  amount: number
  svg: { fill: string }
}

class GraficoCaloriaDiaria extends React.PureComponent {
  render() {
    const data: PieChartData[] = [
      {
        key: 1,
        amount: 50,
        svg: { fill: "#9C121E" } // Tom mais escuro de vermelho
      },
      {
        key: 2,
        amount: 50,
        svg: { fill: "#C2183A" } // Tom de vermelho médio
      },
      {
        key: 3,
        amount: 40,
        svg: { fill: "#D94F54" } // Tom de vermelho claro
      },
      {
        key: 4,
        amount: 95,
        svg: { fill: "#E0828D" } // Outro tom de vermelho
      },
      {
        key: 5,
        amount: 35,
        svg: { fill: "#F0B2B4" } // Tom mais claro
      }
    ]

    // Valor total fixo para o texto
    const totalAmount = 2000 // Substitua pela lógica que você desejar

    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <View style={{ position: "relative", justifyContent: "center", alignItems: "center" }}>
          <PieChart
            style={{ height: 200, width: 200 }} // Adicione a largura aqui
            valueAccessor={({ item }: { item: PieChartData }) => item.amount} // Tipagem explícita
            data={data}
            spacing={0}
            outerRadius={"100%"}
            innerRadius={"70%"} // Ajuste o innerRadius para torná-lo mais fino
          />
          <View style={{ position: "absolute", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "black", fontSize: 12 }}>Você consumiu</Text>
            <Text style={{ color: "#9C121E", fontSize: 24, fontWeight: "bold" }}>
              {totalAmount} kcal
            </Text>
            <Text style={{ color: "black", fontSize: 12 }}>hoje.</Text>
          </View>
        </View>
        <Text style={styles.dailyGoalText}>
          Sua meta diaria é <Text style={styles.goalText}>3000kcal</Text>
        </Text>
      </View>
    )
  }
}

export default GraficoCaloriaDiaria

const styles = StyleSheet.create({
  dailyGoalText: {
    marginTop: 20,
    fontSize: 16,
    color: "#000",
    marginBottom: 20
  },
  goalText: {
    fontWeight: "bold"
  }
})
