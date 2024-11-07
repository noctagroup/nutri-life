import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { Defs, Line, LinearGradient, Stop } from "react-native-svg"
import { BarChart } from "react-native-svg-charts"

class GraficoCaloriaSemanal extends React.PureComponent {
  render() {
    const data = [100, 150, 200, 250, 300, 200, 150]
    const CUT_OFF = 100

    const CustomGrid = ({ x, y }) => (
      <Line
        x1="0"
        x2="100%"
        y1={y(CUT_OFF)}
        y2={y(CUT_OFF)}
        stroke="gray"
        strokeDasharray={[4, 8]}
        strokeWidth={1}
      />
    )

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Meta Calórica Semanal</Text>
            <Text style={styles.calories}>2070.99</Text>
          </View>
          <View>
            <Text style={styles.title}>Ainda Falta</Text>
            <Text style={styles.remainingCalories}>400.90</Text>
          </View>
        </View>
        <View style={styles.chartContainer}>
          <BarChart
            style={{ flex: 1, borderRadius: 8 }}
            data={data}
            yAccessor={({ item }) => item}
            svg={{
              fill: "url(#gradient)"
            }}
            contentInset={{ top: 20, bottom: 20 }}
            spacingInner={0.5}
            spacingOuter={0.3}
            gridMin={0}>
            <CustomGrid x={undefined} y={undefined} />
            <Defs>
              <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#8B0000" stopOpacity="1" />
                <Stop offset="1" stopColor="#FA8072" stopOpacity="0.6" />
              </LinearGradient>
            </Defs>
          </BarChart>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    paddingStart: 15,
    paddingEnd: 15,
    paddingTop: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    width: "100%",
    marginBottom: 30,
    marginTop: 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontSize: 16,
    color: "#292626"
  },
  calories: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8B0000"
  },
  remainingCalories: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#8B0000"
  },
  chartContainer: {
    flexDirection: "row",
    height: 130
  }
})

export default GraficoCaloriaSemanal
