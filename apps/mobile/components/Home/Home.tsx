import AsyncStorage from "@react-native-async-storage/async-storage"
import { router, useFocusEffect } from "expo-router" // Certifique-se de importar useFocusEffect corretamente
import { useCallback, useState } from "react"
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import GraficoCaloriaDiaria from "./GraficoCaloriaDiaria"
import GraficoCaloriaSemanal from "./GraficoCaloriaSemanal"

export default function PaginaHome() {
  const [consumoDiario, setConsumoDiario] = useState([])
  const [caloriasTotal, setCaloriasTotal] = useState(0)
  const [metabolismo, setMetabolismo] = useState(0)
  const [passos, setPassos] = useState(0)
  const [passosKm, setPassosKm] = useState(0)
  const [ultimaRefeicao, setUltimaRefeicao] = useState({
    tipoRefeicao: "",
    alimentos: [""],
    totalCaloria: 0,
    hora: ""
  })
  const [consumoSemanal, setConsumoSemanal] = useState([])
  const [totalCaloriasSemanal, setTotalCaloriasSemanal] = useState(0)

  const handlePress = () => {
    router.push("/adicionarConsumo")
  }

  const getFillColor = (index: number) => {
    const colors = ["#9C121E", "#C2183A", "#D94F54", "#E0828D", "#F0B2B4"]
    return colors[index % colors.length]
  }

  const formatarHora = (horaISO: string): string => {
    const data = new Date(horaISO)
    const horas = data.getUTCHours().toString().padStart(2, "0")
    const minutos = data.getUTCMinutes().toString().padStart(2, "0")
    return `${horas}:${minutos}`
  }

  const fetchConsumoDiario = async () => {
    const token = await AsyncStorage.getItem("userToken")
    const response = await fetch("http://167.99.232.38:3000/refeicao/diaria", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      const caloriasData = data.calorias.map((caloria: number, index: number) => ({
        key: index + 1,
        amount: caloria,
        svg: { fill: getFillColor(index) }
      }))
      setCaloriasTotal(data.totalCalorais)
      setConsumoDiario(caloriasData)
    } else {
      console.error("Erro ao buscar dados:", response.status)
    }
  }

  const fetchMetabolismo = async () => {
    const token = await AsyncStorage.getItem("userToken")
    const response = await fetch("http://167.99.232.38:3000/metabolismo", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.ok) {
      const metabolismo = await response.json()
      setMetabolismo(metabolismo)
      setTotalCaloriasSemanal(metabolismo * 7)
    } else {
      console.error("Erro ao buscar metabolismo:", response.status)
    }
  }

  const fetchPassos = async () => {
    const token = await AsyncStorage.getItem("userToken")
    const response = await fetch("http://167.99.232.38:3000/passos", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.ok) {
      const passos = await response.json()
      setPassos(passos)
      setPassosKm(passos * 0.0007)
    } else {
      console.error("Erro ao buscar passos:", response.status)
    }
  }

  const fetchUltimaRefeicao = async () => {
    const token = await AsyncStorage.getItem("userToken")
    const response = await fetch("http://167.99.232.38:3000/refeicao/ultima", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.ok) {
      const ultimaRefeicao = await response.json()
      setUltimaRefeicao(ultimaRefeicao)
    } else {
      console.error("Erro ao buscar ultima refeição:", response.status)
    }
  }

  const fetchConsumoSemanal = async () => {
    const token = await AsyncStorage.getItem("userToken")
    const response = await fetch("http://167.99.232.38:3000/refeicao/semanal", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.ok) {
      const consumoSemanal = await response.json()
      setConsumoSemanal(consumoSemanal)
    } else {
      console.error("Erro ao buscar consumo semanal:", response.status)
    }
  }

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await Promise.all([
          fetchConsumoDiario(),
          fetchMetabolismo(),
          fetchPassos(),
          fetchUltimaRefeicao(),
          fetchConsumoSemanal()
        ])
      }

      fetchData()

      const intervalId = setInterval(fetchData, 10000)

      return () => clearInterval(intervalId)
    }, [])
  )

  return (
    <ScrollView>
      <View style={styles.containerPage}>
        <Text style={styles.greetingText}>
          Olá, <Text style={styles.userName}>Usuario!</Text>
        </Text>
        <GraficoCaloriaDiaria
          data={consumoDiario}
          dailyGoal={metabolismo}
          totalAmount={caloriasTotal}
        />
        <View style={styles.card}>
          <View style={styles.cardLeft}>
            <Image
              source={{
                uri: "https://res.cloudinary.com/ds7amlveq/image/upload/v1730999475/footsteps_er6ca4.png"
              }}
              style={{ width: 40, height: 40 }}
            />
          </View>

          <View style={styles.cardRight}>
            <Text style={styles.cardContent}>
              Passos dados hoje:{" "}
              <Text style={{ fontWeight: "bold", color: "#9C121E" }}>{passos}</Text>
            </Text>
            <Text style={styles.cardContent}>
              Isso dá em média{" "}
              <Text style={{ fontWeight: "bold", color: "#9C121E" }}>{passosKm.toFixed(2)}</Text> Km
            </Text>
          </View>
        </View>
        <View style={styles.containerContent}>
          <Text style={styles.mainText}>Sua última refeição foi:</Text>
          <View style={styles.containerButtons}>
            <View style={styles.card}>
              <View style={styles.cardLeft}>
                <Text style={styles.cardTitle}>{ultimaRefeicao.tipoRefeicao}</Text>
                <Image
                  source={{
                    uri: "https://res.cloudinary.com/ds7amlveq/image/upload/v1729794185/Breakfast_cg6dtn.png"
                  }}
                  style={{ width: 40, height: 40 }}
                />
              </View>

              <View style={styles.cardRight}>
                <Text style={styles.cardContent}>{ultimaRefeicao.alimentos.join("; ")}</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.cardFooterText}>
                    {ultimaRefeicao.totalCaloria} <Text style={styles.kcalText}>Kcal</Text>
                  </Text>
                  <Text style={styles.kcalText}>{formatarHora(ultimaRefeicao.hora)}</Text>
                </View>
              </View>
            </View>

            <GraficoCaloriaSemanal
              data={consumoSemanal}
              totalCalories={totalCaloriasSemanal}
              metabolism={metabolismo}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handlePress}>
          <Text style={styles.addButtonText}>+ Adicionar Consumo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  containerPage: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 30,
    paddingVertical: 40,
    justifyContent: "flex-start"
  },
  greetingText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15
  },
  userName: {
    color: "#9C121E"
  },
  caloriesInfoContainer: {},
  consumedText: {
    fontSize: 16,
    color: "#000"
  },
  caloriesText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#C60000"
  },
  containerContent: {
    gap: 20
  },
  containerButtons: {
    flexShrink: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    width: "100%",
    gap: 15
  },
  mainText: {
    marginTop: 25,
    fontSize: 16,
    textAlign: "left"
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    elevation: 8
  },
  cardLeft: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 20
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000"
  },
  cardImage: {
    width: 60,
    height: 60
  },
  cardRight: {
    flex: 1,
    justifyContent: "flex-start"
  },
  cardContent: {
    fontSize: 16,
    color: "#000"
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  cardFooterText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#000"
  },
  kcalText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#9c121e"
  },
  addButton: {
    backgroundColor: "#9C121E",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center"
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  },

  // Estilos do segundo card (Meta Calórica Semanal)
  weeklyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    justifyContent: "space-between"
  },
  weeklyInfoContainer: {
    alignItems: "center"
  },
  weeklyText: {
    fontSize: 14,
    color: "#000"
  },
  weeklyTextHighlight: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#9c121e"
  }
})
