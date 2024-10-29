import AsyncStorage from "@react-native-async-storage/async-storage"
import { Router } from "expo-router"

export default class Anamnesis {
  static async hasAnamnesis(router: Router): Promise<void> {
    try {
      const token = await AsyncStorage.getItem("userToken")

      if (!token) {
        return
      }

      const response = await fetch("http://167.99.232.38:3000/anamnese/check", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const { hasAnamnese } = await response.json()

      if (!hasAnamnese) {
        router.push("/anamnesis/")
      }
    } catch (error) {
      console.error("Erro ao checar se tem anamnese:", error)
    }
  }
}
