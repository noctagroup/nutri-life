import { useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"

interface InputDataProps {
  selected: boolean
  date: string
  setDate: (date: string) => void
}

export function InputData({ selected, date, setDate }: InputDataProps) {
  const [error, setError] = useState("")

  const handleDateChange = (text: string) => {
    const cleanText = text.replace(/[^0-9]/g, "")

    if (cleanText.length <= 2) {
      setDate(cleanText)
    } else if (cleanText.length <= 4) {
      setDate(`${cleanText.slice(0, 2)}/${cleanText.slice(2)}`)
    } else if (cleanText.length <= 8) {
      setDate(`${cleanText.slice(0, 2)}/${cleanText.slice(2, 4)}/${cleanText.slice(4)}`)
    }

    if (cleanText.length === 8) {
      const day = parseInt(cleanText.slice(0, 2), 10)
      const month = parseInt(cleanText.slice(2, 4), 10)
      const year = parseInt(cleanText.slice(4), 10)

      if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1000 || year > 9999) {
        setError("Data inválida")
      } else {
        setError("")
      }
    } else {
      setError("")
    }
  }

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <TextInput
        style={[styles.card, selected && styles.selectedCard]}
        placeholder="__ /__ /____"
        value={date}
        onChangeText={handleDateChange}
        keyboardType="numeric"
        maxLength={10}
       
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
    height: 80,
    borderRadius: 15,
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    fontSize: 24,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: "#9C121E"
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 5,
    textAlign: "center"
  }
})
