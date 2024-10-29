import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"
import { useState } from "react"
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import { StepIndicator } from "@/components/Anamnese/AnamneseStepIndicator"
import { useAnamnesis } from "@/context/AmnesisContext"

export default function AnamneseFinal() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { anamnesisData } = useAnamnesis()

  const handleConfirmarPress = async () => {
    setLoading(true)

    const [day, month, year] = anamnesisData.dataNasc.split("/")
    const dataNasc = new Date(`${year}-${month}-${day}`)
    const dataNascIso = dataNasc.toISOString()

    try {
      const response = await fetch("http://167.99.232.38:3000/anamnese", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await AsyncStorage.getItem("userToken")}`
        },
        body: JSON.stringify({
          dataNasc: dataNascIso,
          genero: anamnesisData.genero,
          pesoAtual: Number(anamnesisData.peso),
          altura: Number(anamnesisData.altura),
          objetivo: anamnesisData.objetivo,
          atividadeFisica: anamnesisData.atividade
        })
      })

      if (response.ok) {
        setLoading(false)
        router.push("/(home)/")
      } else {
        AsyncStorage.removeItem("userToken")
        router.push("/(home)/")
      }
    } catch (err) {
      throw new Error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAlterarDados = () => {
    router.push("/anamnesis/atividade")
  }

  return (
    <View style={styles.containerPage}>
      {/* Step Indicator */}
      <StepIndicator totalSteps={7} currentStep={7} />

      {/* Title */}
      <Text style={styles.mainText}>Confirma os dados abaixo?</Text>

      {/* Card with User Information */}
      <View style={styles.infoCard}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados Pessoais</Text>
          <Text style={styles.whiteContent}>
            <Text style={styles.boldText}>Data de nascimento:</Text> {anamnesisData.dataNasc}
          </Text>
          <Text style={styles.whiteContent}>
            <Text style={styles.boldText}>Sexo:</Text> {anamnesisData.genero}
          </Text>
          <Text style={styles.whiteContent}>
            <Text style={styles.boldText}>Peso:</Text> {anamnesisData.peso}kg
          </Text>
          <Text style={styles.whiteContent}>
            <Text style={styles.boldText}>Altura:</Text> {anamnesisData.altura}m
          </Text>
        </View>

        <View style={styles.sectionExtra}>
          <Text style={styles.sectionTitleExtra}>Informações Extras</Text>
          <Text style={styles.redContent}>
            <Text style={styles.boldText}>Objetivo:</Text> {anamnesisData.objetivo}
          </Text>
          <Text style={styles.redContent}>
            <Text style={styles.boldText}>Nível de Atividade Física:</Text>{" "}
            {anamnesisData.atividade}
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#9C121E" />
        ) : (
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmarPress}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.cancelButton} onPress={handleAlterarDados}>
          <Text style={styles.cancelButtonText}>Não, alterar dados</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerPage: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 30,
    paddingVertical: 15,
    justifyContent: "space-between",
    alignItems: "center"
  },
  mainText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
  },
  infoCard: {
    width: "100%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  section: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 15,
    width: "100%"
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#9C121E"
  },
  sectionExtra: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#9C121E",
    padding: 15,
    borderRadius: 10,
    width: "100%"
  },
  sectionTitleExtra: {
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 10
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    paddingBottom: 10
  },
  confirmButton: {
    backgroundColor: "#9C121E",
    borderRadius: 10,
    padding: 15,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  cancelButton: {
    backgroundColor: "transparent",
    padding: 10,
    alignItems: "center"
  },
  whiteContent: {
    color: "#9C121E"
  },
  redContent: {
    color: "#FFFFFF",
    textAlign: "right"
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF"
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#9C121E",
    textDecorationLine: "underline"
  },
  boldText: {
    fontWeight: "bold"
  }
})
