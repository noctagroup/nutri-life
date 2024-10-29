import React from "react"
import { View } from "react-native"
import { Defs, LinearGradient, Stop, Text } from "react-native-svg"
import { BarChart, Grid } from "react-native-svg-charts"

class GraficoCaloriaSemanal extends React.PureComponent {
  render() {
    const data = [10, 15, 20, 25, 30, 20, 15]
    const CUT_OFF = 20

    const Labels = ({ x, y, bandwidth, data }) =>
      data.map((value, index) => (
        <Text
          key={index}
          x={x(index) + bandwidth / 2}
          y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
          fontSize={14}
          fill={value >= CUT_OFF ? "white" : "black"}
          alignmentBaseline={"middle"}
          textAnchor={"middle"}>
          {value}
        </Text>
      ))

    return (
      <View style={{ flexDirection: "row", height: 200, paddingVertical: 16 }}>
        <BarChart
          style={{ flex: 1, borderRadius: 8 }}
          data={data}
          yAccessor={({ item }) => item}
          svg={{
            fill: "url(#gradient)",
            rx: 100, // Rounded corners
            ry: 100
          }}
          contentInset={{ top: 20, bottom: 20 }}
          spacing={0.3} // Aumente o espaçamento entre as barras
          gridMin={0}>
          <Grid direction={Grid.Direction.HORIZONTAL} />
          <Labels x={undefined} y={undefined} bandwidth={undefined} data={data} />
          <Defs>
            <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#8B0000" stopOpacity="1" />
              <Stop offset="1" stopColor="#FA8072" stopOpacity="0.6" />
            </LinearGradient>
          </Defs>
        </BarChart>
      </View>
    )
  }
}

export default GraficoCaloriaSemanal
