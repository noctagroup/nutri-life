import { useRouter } from "expo-router"
import { useState } from "react"
import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import { useCadastro } from "@/context/CadastroContext"

import Footer, { FooterOption } from "./Footer"
import Header from "./Header"
import InputLogin from "./InputLogin"
import OutlinedButton from "./OutlineButton"
import RedButton from "./RedButton"

export default function FormularioCadastro() {
  const { dados, setDados } = useCadastro()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const router = useRouter()

  const handleFormSubmission = async () => {
    setLoading(true)
    setError("")

    if (dados.senha !== dados.senha_confirma) {
      setError("As senhas não coincidem.")
      setLoading(false)
      setDados({
        ...dados,
        senha: "",
        senha_confirma: ""
      })
      return
    }

    try {
      const response = await fetch("http://167.99.232.38:3000/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: dados.email,
          senha: dados.senha,
          nome: dados.nome,
          sobrenome: dados.sobrenome
        })
      })

      if (response.ok) {
        setModalMessage("Você foi registrado!")
        setModalVisible(true)
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

  const closeModal = () => {
    setModalVisible(false) // Close the modal
    router.push("/auth") // Navigate to the /auth/login route
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.whiteContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <InputLogin
            value={dados.nome}
            onChangeText={(text: string) => setDados({ ...dados, nome: text })}
            placeholder="Nome"
            isPassword={false}
          />
          <InputLogin
            value={dados.sobrenome}
            onChangeText={(text: string) => setDados({ ...dados, sobrenome: text })}
            placeholder="Sobrenome"
            isPassword={false}
          />
          <InputLogin
            value={dados.email}
            onChangeText={(text: string) => setDados({ ...dados, email: text })}
            placeholder="Email"
            isPassword={false}
          />
          <InputLogin
            value={dados.senha}
            onChangeText={(text: string) => setDados({ ...dados, senha: text })}
            placeholder="Senha"
            isPassword={true}
          />
          <InputLogin
            value={dados.senha_confirma}
            onChangeText={(text: string) => setDados({ ...dados, senha_confirma: text })}
            placeholder="Confirmar Senha"
            isPassword={true}
          />

          {/* Show error message if it exists */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Show loading indicator if the form is being submitted */}
          {loading ? (
            <ActivityIndicator size="large" color="#9C121E" />
          ) : (
            <RedButton onPress={handleFormSubmission} />
          )}

          <OutlinedButton buttonText={`Cadastro pelo\nGoogle`} />
          <View style={{marginTop: 30}}></View>
          <Footer textoFooter={"Ja cadastrado?"} footerOption={FooterOption.LOGIN} />
        </ScrollView>

        {/* Modal for Success/Message */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal} // Close modal and navigate on request close
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{modalMessage}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeModal} // Close the modal and navigate to login
              >
                <Text style={styles.closeButtonText}>Continuar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 50,
  },
  errorText: {
    color: "red",
    marginBottom: 10
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)" // Semi-transparent background
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center"
  },
  closeButton: {
    backgroundColor: "#9C121E",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  closeButtonText: {
    color: "white",
    fontSize: 16
  }
})
