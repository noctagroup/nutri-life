import debounce from "lodash.debounce"
import React, { useEffect, useState } from "react"
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

interface Suggestion {
  id: number
  alimento: string
}
interface InputRow {
  id: number
  alimentoId: number | null
  grams: string
}

interface InputRowCardProps {
  row: InputRow
  inputRows: InputRow[]
  setInputRows: React.Dispatch<React.SetStateAction<InputRow[]>>
  removeRow: (id: number) => void
}

export default function InputRowCard({
  row,
  setInputRows,
  inputRows,
  removeRow
}: InputRowCardProps) {
  const [foodName, setFoodName] = useState(row.alimentoId ? row.alimentoId.toString() : "")
  const [grams, setGrams] = useState(row.grams)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])

  const fetchSuggestions = async (name: string) => {
    try {
      const response = await fetch(`http://167.99.232.38:3000/alimentos?nomeAlimento=${name}`)
      if (response.ok) {
        const data = await response.json()
        setSuggestions(data)
      }
    } catch (error) {
      console.error("Erro ao buscar alimentos:", error)
    }
  }

  const handleFoodNameChange = (name: string) => {
    setFoodName(name)
    debounceFetchSuggestions(name)
  }

  const debounceFetchSuggestions = debounce(fetchSuggestions, 300)

  useEffect(() => {
    if (!foodName) {
      setSuggestions([])
    }
  }, [foodName])

  const selectSuggestion = (suggestion: Suggestion) => {
    setFoodName(suggestion.alimento)
    setSuggestions([])

    const updatedRows = inputRows.map((item) =>
      item.id === row.id ? { ...item, alimentoId: suggestion.id } : item
    )
    setInputRows(updatedRows)
  }

  return (
    <View style={styles.rowContainer}>
      <TextInput
        style={styles.input}
        placeholder="Digite o alimento"
        value={foodName}
        onChangeText={handleFoodNameChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Gramas"
        keyboardType="numeric"
        value={grams}
        onChangeText={(text) => {
          setGrams(text)
          const updatedRows = inputRows.map((item) =>
            item.id === row.id ? { ...item, grams: text } : item
          )
          setInputRows(updatedRows)
        }}
      />
      <TouchableOpacity onPress={() => removeRow(row.id)}>
        <Text style={styles.removeButton}>Remover</Text>
      </TouchableOpacity>

      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => selectSuggestion(item)}>
              <Text style={styles.suggestionText}>{item.alimento}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    flex: 1,
    marginHorizontal: 5
  },
  removeButton: {
    color: "red",
    fontWeight: "bold",
    marginLeft: 5
  },
  suggestionText: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderColor: "#ddd"
  }
})
