import AsyncStorage from "@react-native-async-storage/async-storage"
import { Router } from "expo-router"

export default class Authorization {
  static async isAuthorized(router: Router): Promise<void> {
    try {
      const token = await AsyncStorage.getItem("userToken")

      if (token) {
        const response = await fetch("http://167.99.232.38:3000/auth/check", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!response.ok) {
          router.push("/auth?message=token_expirado")
        }
      } else {
        router.push("/auth?message=token_faltante")
      }
    } catch (error) {
      console.error("Authorization check failed:", error)
      router.push("/auth/")
    }
  }
}
