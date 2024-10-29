import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import GraficoCaloriaDiaria from "./GraficoCaloriaDiaria"

export default function PaginaHome() {
  return (
    <View style={styles.containerPage}>
      {/* Saudação */}
      <Text style={styles.greetingText}>
        Olá, <Text style={styles.userName}>Usuario!</Text>
      </Text>
      <GraficoCaloriaDiaria />

      {/* Próxima refeição */}
      <View style={styles.containerContent}>
        <Text style={styles.mainText}>Próxima refeição:</Text>
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
          <View style={styles.weeklyCard}>
            <View style={styles.weeklyInfoContainer}>
              <Text style={styles.weeklyText}>Meta Calorica Semanal</Text>
              <Text style={styles.weeklyTextHighlight}>2070.99</Text>
            </View>
            <View style={styles.weeklyInfoContainer}>
              <Text style={styles.weeklyText}>Ainda Falta</Text>
              <Text style={styles.weeklyTextHighlight}>400.90</Text>
            </View>
            {/* Aqui é onde o gráfico circular será incluído no futuro */}
          </View>
        </View>
      </View>

      {/* Botão Adicionar Consumo */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Adicionar Consumo</Text>
      </TouchableOpacity>
    </View>
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
    color: "#000"
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
    fontSize: 20,
    textAlign: "left",
   
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    width: "100%"
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
    alignItems: "center",
    marginTop: 20
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
