import { useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import DropdownCard from "./DropdownCard" // Importa o novo componente
import InputRowCard from "./InputRowCard" // Importa o novo componente

export default function PaginaConsumo() {
  const [value, setValue] = useState(null)
  const [items, setItems] = useState([
    { label: "Almoço", value: "almoco" },
    { label: "Janta", value: "janta" },
    { label: "Café da Manhã", value: "cafeManha" },
    { label: "Café da Tarde", value: "cafeTarde" },
    { label: "Lanche", value: "lanche" }
  ])

  const [inputRows, setInputRows] = useState([{ id: 1, food: "", grams: "" }])

  const addRow = () => {
    setInputRows([...inputRows, { id: inputRows.length + 1, food: "", grams: "" }])
  }

  const removeRow = (id) => {
    setInputRows(inputRows.filter((row) => row.id !== id))
  }

  return (
    <View style={styles.containerPage}>
      <Text style={styles.title}>Qual foi sua refeição?</Text>

      <DropdownCard items={items} value={value} setValue={setValue} />

      <View style={styles.inputRowTitle}>
        <Text style={styles.title}>O que comeu?</Text>
        <Text style={styles.title}>Quantas gramas?</Text>
      </View>

      <ScrollView style={styles.inputContainer}>
        {inputRows.map((row) => (
          <InputRowCard key={row.id} row={row} removeRow={removeRow} />
        ))}

        <TouchableOpacity style={styles.roundButton} onPress={addRow}>
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Salvar Refeição</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  containerPage: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 30,
    paddingVertical: 40,
    justifyContent: "space-between"
  },
  inputContainer: {
    flexGrow: 1,
    paddingBottom: 10
  },
  inputRowTitle: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontWeight: "bold"
  },
  addButton: {
    backgroundColor: "#9C121E",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center"
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  },
  roundButton: {
    backgroundColor: "#9C121E",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 10
  },
  plusText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold"
  }
})
