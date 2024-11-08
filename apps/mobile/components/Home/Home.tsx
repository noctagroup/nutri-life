import { router } from "expo-router"
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import GraficoCaloriaDiaria from "./GraficoCaloriaDiaria"
import GraficoCaloriaSemanal from "./GraficoCaloriaSemanal"

export default function PaginaHome() {
  const handlePress = () => {
    router.push("/adicionarConsumo")
  }

  // const { dados } = useCadastro()
  return (
    <ScrollView>
      <View style={styles.containerPage}>
        {/* Saudação */}
        <Text style={styles.greetingText}>
          Olá, <Text style={styles.userName}>Usuario!</Text>
        </Text>
        <GraficoCaloriaDiaria />
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
              Passos dados hoje: <Text style={{ fontWeight: "bold", color: "#9C121E" }}>3000</Text>
            </Text>
            <Text style={styles.cardContent}>
              Isso dá em media<Text> 2,22 </Text>
              <Text style={{ fontWeight: "bold", color: "#9C121E" }}>Kms</Text>
            </Text>
          </View>
        </View>
        {/* Próxima refeição */}
        <View style={styles.containerContent}>
          <Text style={styles.mainText}>Sua ultima refeição foi:</Text>
          <View style={styles.containerButtons}>
            {/* Primeiro Card */}
            <View style={styles.card}>
              <View style={styles.cardLeft}>
                <Text style={styles.cardTitle}>Almoço</Text>
                <Image
                  source={{
                    uri: "https://res.cloudinary.com/ds7amlveq/image/upload/v1729794185/Breakfast_cg6dtn.png"
                  }}
                  style={{ width: 40, height: 40 }}
                />
              </View>

              <View style={styles.cardRight}>
                <Text style={styles.cardContent}>
                  Arroz, Feijão, Salada de tomate, frango empanado
                </Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.cardFooterText}>
                    546 <Text style={styles.kcalText}>Kcal</Text>
                  </Text>
                  <Text style={styles.kcalText}>12:40</Text>
                </View>
              </View>
            </View>

            {/* Segundo Card - Meta Calórica Semanal */}
            <GraficoCaloriaSemanal />
          </View>
        </View>

        {/* Botão Adicionar Consumo */}
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
