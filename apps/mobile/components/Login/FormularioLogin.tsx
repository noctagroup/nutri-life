import AsyncStorage from "@react-native-async-storage/async-storage"
import { useLocalSearchParams, useRouter } from "expo-router"
import { SetStateAction, useEffect, useState } from "react"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"

import Footer, { FooterOption } from "./Footer"
import Header from "./Header"
import InputLogin from "./InputLogin"
import OutlinedButton from "./OutlineButton"
import RedButton from "./RedButton"

export default function FormularioLogin() {
  const router = useRouter()
  const { message } = useLocalSearchParams()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  useEffect(() => {
    if (message === "token_expirado") {
      setError("Seu token expirou, faça login novamente.")
    } else if (message === "token_faltante") {
      setError("Faça login antes de prosseguir.")
    }
  }, [message])

  const handleFormSubmission = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("http://167.99.232.38:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          senha: senha
        })
      })

      if (response.ok) {
        const responseData = await response.json()
        const token = responseData.acess_token

        await AsyncStorage.setItem("userToken", token)
        router.push("/(home)/")
      } else {
        const errorResponse = await response.json()
        setError(errorResponse.message || "O registo falhou.")
      }
    } catch (err) {
      setError("Um erro ocorreu, tente novamente depois.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.whiteContainer}>
        <InputLogin
          placeholder="Digite seu email"
          value={email}
          onChangeText={(e: SetStateAction<string>) => setEmail(e)}
          isPassword={false}
        />
        <InputLogin
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={(e: SetStateAction<string>) => setSenha(e)}
          isPassword={true}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {loading ? (
          <ActivityIndicator size="large" color="#9C121E" />
        ) : (
          <RedButton onPress={handleFormSubmission} />
        )}
        <OutlinedButton buttonText={`Login pelo\nGoogle`} />
        <View style={{ flexDirection: "row", marginTop: 100 }}>
          <Footer textoFooter={"Não cadastrado?\n"} footerOption={FooterOption.CADASTRO} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#9C121E",
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopEndRadius: 50,
    paddingStart: 40,
    paddingEnd: 40,
    paddingTop: 50,
    alignItems: "center"
  },
  errorText: {
    color: "red",
    marginBottom: 10
  }
})
