import { useRouter } from "expo-router"
import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"

import { StepIndicator } from "@/components/Anamnese/AnamneseStepIndicator"
import { CardFlexImage } from "@/components/Anamnese/CardFlexImage"
import { PaginationButtons } from "@/components/Anamnese/NextPrevButtons"
import { useAnamnesis } from "@/context/AmnesisContext"

export default function AnamneseAtividade() {
  const router = useRouter()
  const { anamnesisData, setAnamnesisData } = useAnamnesis()

  const [atividade, setAtividade] = useState(
    anamnesisData.atividade ? anamnesisData.atividade : "Leve"
  )

  const handlePressNext = () => {
    setAnamnesisData({ atividade })
    router.push("/anamnesis/finalizar")
  }

  const handlePressPrevious = () => {
    router.push("/anamnesis/objetivo")
  }

  return (
    <View style={styles.containerPage}>
      <StepIndicator totalSteps={7} currentStep={6} />
      <View style={styles.containerContent}>
        <Text style={styles.mainText}>Qual seu nível de pratica de atividade física?</Text>
        <View style={styles.containerButtons}>
          <CardFlexImage
            title={"Leve"}
            content={"Trabalho em pé ou caminhadas leves"}
            selected={atividade === "Leve"}
            onPress={() => setAtividade("Leve")}

            image={{
              uri: "https://res.cloudinary.com/ds7amlveq/image/upload/v1729787046/leve_qcnhyy.png"
            }}
            imageWidth={60} 
            imageHeight={42.86} 

          />
          <CardFlexImage
            title={"Moderada"}
            content={"Trabalho pesado ou atividade físicas regulares"}
            selected={atividade === "Moderada"}
            onPress={() => setAtividade("Moderada")}
            image={{
              uri: "https://res.cloudinary.com/ds7amlveq/image/upload/v1729787092/moderado_qfavlz.png"
            }}
            imageWidth={60} 
            imageHeight={42.86} 
          />
          <CardFlexImage
            title={"Intensa"}
            content={"Atividade físicas intensas todos os dias"}
            selected={atividade === "Intensa"}
            onPress={() => setAtividade("Intensa")}
            image={{
              uri: "https://res.cloudinary.com/ds7amlveq/image/upload/v1729787100/intenso_os7b01.png"
            }}
            imageWidth={60} 
            imageHeight={42.86} 
          />
        </View>
      </View>
      <View style={styles.containerPagination}>
        <PaginationButtons
          showNext={true}
          showPrevious={true}
          onPreviousPress={() => handlePressPrevious()}
          onNextPress={() => handlePressNext()}
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
    flexShrink: 1, // Allow shrinking based on its content
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
    fontSize: 24,
    textAlign: "left",
    width: "100%",
    marginBottom: 100
  }
})
