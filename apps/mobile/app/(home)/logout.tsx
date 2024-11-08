import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"
import { useEffect } from "react"
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native"

export default function Logout() {
  const router = useRouter()

  useEffect(() => {
    // Função para confirmar logout
    const confirmLogout = () => {
      Alert.alert("Confirmação de Saída", "Tem certeza de que deseja sair?", [
        {
          text: "Cancelar",
          style: "cancel",
          onPress: () => router.back() // Retorna à página anterior se cancelar
        },
        {
          text: "Sim",
          style: "destructive",
          onPress: () => performLogout() // Prossegue com o logout se confirmar
        }
      ])
    }

    // Função para realizar o logout
    const performLogout = async () => {
      try {
        // Remove o token do armazenamento
        await AsyncStorage.removeItem("userToken")
        // Redireciona para a página de login
        router.replace("/auth")
      } catch (error) {
        console.error("Erro ao fazer logout:", error)
      }
    }

    confirmLogout()
  }, [])

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#9C121E" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  }
})
