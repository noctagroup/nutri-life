import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { PieChart } from "react-native-svg-charts"

// Definição do tipo de dado para os itens do gráfico
interface PieChartData {
  key: number
  amount: number
  svg: { fill: string }
}

// Definindo as props que o componente aceitará
interface GraficoCaloriaDiariaProps {
  data: PieChartData[]
  totalAmount: number
  dailyGoal: number
}

class GraficoCaloriaDiaria extends React.PureComponent<GraficoCaloriaDiariaProps> {
  render() {
    const { data, totalAmount, dailyGoal } = this.props

    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <View style={{ position: "relative", justifyContent: "center", alignItems: "center" }}>
          <PieChart
            style={{ height: 200, width: 200 }}
            valueAccessor={({ item }: { item: PieChartData }) => item.amount}
            data={data}
            spacing={0}
            outerRadius={"100%"}
            innerRadius={"70%"}
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
          Sua meta diária é <Text style={styles.goalText}>{dailyGoal} kcal</Text>
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
