import { useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"

interface InputNumberProps {
  value: string
  maxNumber: number
  maxNumberErrorMessage: string
  placeholder: string
  setNumber: (number: string) => void
}

export function InputNumber({
  value,
  maxNumber,
  maxNumberErrorMessage,
  placeholder,
  setNumber
}: InputNumberProps) {
  const [error, setError] = useState("")

  const handleNumberChange = (text: string) => {
    // Permitir apenas números, ".", e ","
    const cleanText = text.replace(/[^0-9.,]/g, "")

    // Substituir "," por "." para garantir a consistência no valor numérico
    const formattedText = cleanText.replace(",", ".")

    // Verificar se o valor formatado pode ser convertido para número
    const number = Number(formattedText)
    if (formattedText === "") {
      setNumber("")
      setError("")
    } else if (isNaN(number) || number <= 0) {
      setError("Por favor, insira um número válido")
    } else if (number > maxNumber) {
      setNumber("")
      setError(maxNumberErrorMessage)
    } else {
      setError("")
      setNumber(formattedText) // Mantém o valor em string, mas formatado corretamente
    }
  }

  return (
    <View>
      <TextInput
        style={[styles.input, error ? styles.inputError : undefined]}
        placeholder={placeholder}
        placeholderTextColor="#888" // Define a cor do placeholder
        value={value}
        onChangeText={handleNumberChange}
        keyboardType="numeric"
        maxLength={5} // Define um tamanho máximo de 5, como "1.75"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    fontSize: 18
  },
  inputError: {
    borderColor: "red"
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 5,
    textAlign: "center"
  }
})
