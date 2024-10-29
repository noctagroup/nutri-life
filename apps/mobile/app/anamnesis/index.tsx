import { useRouter } from "expo-router"
import { useEffect } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

import { CardBoasVindas } from "@/components/Anamnese/CardBoasVindas"
import Authorization from "@/hooks/Authorization"

export default function AnamnesisIndex() {
  const router = useRouter()

  const textoBoasVindas =
    "Para personalizar sua experiência e te entregar as melhores decisões nutricionais a equipe Nutrilife precisa te conhecer um pouco melhor."

  const handlePress = () => {
    router.push("/anamnesis/dataNascimento")
  }

  useEffect(() => {
    Authorization.isAuthorized(router)
  }, [router])

  return (
    <View style={styles.containerPage}>
      <View style={styles.containerContent}>
        <View style={styles.containerButtons}>
          <CardBoasVindas />
          <Text style={styles.mainText}>{textoBoasVindas}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => handlePress()}>
          <Text style={styles.buttonText}>{"Bora lá!"}</Text>
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
    paddingVertical: 60,
    justifyContent: "space-between"
  },
  containerContent: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#F4F4F4"
  },
  containerButtons: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    width: 315,
    height: 230,
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
    fontSize: 18,
    textAlign: "left",
    width: "100%",
    marginTop: 15,
    paddingStart: 5
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    borderRadius: 15,
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4
  },
  buttonText: {
    color: "#9C121E",
    fontWeight: "bold",
    fontSize: 16
  }
})
