import { useRouter } from "expo-router"
import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"

import { StepIndicator } from "@/components/Anamnese/AnamneseStepIndicator"
import { CardFlexImage } from "@/components/Anamnese/CardFlexImage"
import { PaginationButtons } from "@/components/Anamnese/NextPrevButtons"
import { useAnamnesis } from "@/context/AmnesisContext"

export default function AnamneseObjetivo() {
  const router = useRouter()
  const { anamnesisData, setAnamnesisData } = useAnamnesis()

  const [objetivo, setObjetivo] = useState(
    anamnesisData.objetivo ? anamnesisData.objetivo : "Emagrecer"
  )

  const handlePressNext = () => {
    setAnamnesisData({ objetivo })
    router.push("/anamnesis/atividade")
  }

  const handlePressPrevious = () => {
    router.push("/anamnesis/peso")
  }

  return (
    <View style={styles.containerPage}>
      <StepIndicator totalSteps={7} currentStep={5} />
      <View style={styles.containerContent}>
        <Text style={styles.mainText}>Qual o seu objetivo?</Text>
        <View style={styles.containerButtons}>
          <CardFlexImage
            title={"Emagrecer"}
            content={"Perder peso de forma saudável"}
            selected={objetivo === "Emagrecer"}
            onPress={() => setObjetivo("Emagrecer")}
            image={{
              uri: "https://res.cloudinary.com/ds7amlveq/image/upload/v1729787532/emagreceremagrecer_dsylxu.png"
            }}
          />
          <CardFlexImage
            title={"Manter o peso"}
            content={"Manter o peso com saúde"}
            selected={objetivo === "ManterPeso"}
            onPress={() => setObjetivo("ManterPeso")}
            image={{
              uri: "https://res.cloudinary.com/ds7amlveq/image/upload/v1729790037/manteremagrecer_h9vulh.png"
            }}
           
          />
          <CardFlexImage
            title={"Ganhar peso"}
            content={"Aumentar a massa magra"}
            selected={objetivo === "GanharPeso"}
            onPress={() => setObjetivo("GanharPeso")}
            image={{
              uri: "https://res.cloudinary.com/ds7amlveq/image/upload/v1729787557/ganhar_znmk3v.png"
            }}
         
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
    fontSize: 24,
    textAlign: "left",
    width: "100%",
    marginBottom: 100
  }
})
