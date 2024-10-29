import { useRouter } from "expo-router"
import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"

import { StepIndicator } from "@/components/Anamnese/AnamneseStepIndicator"
import { PaginationButtons } from "@/components/Anamnese/NextPrevButtons"
import { useAnamnesis } from "@/context/AmnesisContext"

import { InputNumber } from "./InputNumber"

export default function AnamnesePeso() {
  const router = useRouter()
  const { anamnesisData, setAnamnesisData } = useAnamnesis()
  const [peso, setPeso] = useState(anamnesisData.peso ? anamnesisData.peso : "")

  const handlePreviousPress = () => {
    router.push("/anamnesis/altura")
  }

  const handleNextPress = () => {
    if (peso) {
      setAnamnesisData({ peso })
      router.push("/anamnesis/objetivo")
    } else {
      alert("Por favor adicione seu peso")
    }
  }
  return (
    <View style={styles.containerPage}>
      <StepIndicator totalSteps={7} currentStep={4} />
      <View style={styles.containerContent}>
        <Text style={styles.mainText}>Qual o seu peso?</Text>
        <View style={styles.containerButtons}>
          <InputNumber
            value={peso}
            setNumber={setPeso}
            placeholder={"Digite o seu peso (kg)"}
            maxNumber={300}
            maxNumberErrorMessage="Este peso não parece real"
          />
        </View>
      </View>
      <View style={styles.containerPagination}>
        <PaginationButtons
          showNext={true}
          showPrevious={true}
          onPreviousPress={() => handlePreviousPress()}
          onNextPress={() => handleNextPress()}
        />
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
    justifyContent: "space-between"
  },
  containerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#F4F4F4",
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
  containerPagination: {
    height: 100,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20
  },
  mainText: {
    alignSelf: "center",
    fontSize: 24,
    textAlign: "center",
    width: "100%"
  }
})
