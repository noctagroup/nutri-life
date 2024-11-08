import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState } from "react"
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import DropdownCard from "./DropdownCard"
import InputRowCard from "./InputRowCard"

interface InputRow {
  id: number
  alimentoId: number | null
  grams: string
}

export default function PaginaConsumo() {
  const [value, setValue] = useState<string | null>(null)
  const [items] = useState([
    { label: "Almoço", value: "Almoco" },
    { label: "Janta", value: "Janta" },
    { label: "Café da Manhã", value: "CafeDaManha" },
    { label: "Lanche", value: "Lanche" }
  ])
  const [inputRows, setInputRows] = useState<InputRow[]>([{ id: 1, alimentoId: null, grams: "" }])

  const addRow = () => {
    setInputRows([...inputRows, { id: inputRows.length + 1, alimentoId: null, grams: "" }])
  }

  const removeRow = (id: number) => {
    setInputRows(inputRows.filter((row) => row.id !== id))
  }

  // Função para salvar a refeição
  const handleSaveMeal = async () => {
    const token = await AsyncStorage.getItem("userToken")
    if (!value) {
      Alert.alert("Erro", "Por favor, selecione um tipo de refeição.")
      return
    }

    // Filtra os dados e formata o corpo da requisição
    const alimentos = inputRows
      .filter((row) => row.alimentoId && row.grams)
      .map((row) => ({
        alimentoId: row.alimentoId!,
        quantity: parseInt(row.grams, 10)
      }))

    if (alimentos.length === 0) {
      Alert.alert("Erro", "Por favor, adicione pelo menos um alimento com quantidade.")
      return
    }

    const mealData = {
      time: new Date().toISOString(),
      type: value,
      alimentos: alimentos
    }

    try {
      const response = await fetch("http://167.99.232.38:3000/refeicao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(mealData)
      })

      if (response.ok) {
        Alert.alert("Sucesso", "Refeição salva com sucesso!")
        setValue(null)
        setInputRows([])
      } else {
        console.error("Erro ao salvar refeição:", response.status)
        Alert.alert("Erro", "Não foi possível salvar a refeição. Tente novamente.")
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error)
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao tentar salvar a refeição. Verifique sua conexão e tente novamente."
      )
    }
  }

  return (
    <View style={styles.containerPage}>
      <Text style={styles.title}>Qual foi sua refeição?</Text>
      <DropdownCard items={items} value={value} setValue={setValue} />

      <View style={styles.inputRowTitle}>
        <Text style={styles.title}>O que comeu?</Text>
        <Text style={styles.title}>Quantas gramas?</Text>
      </View>

      <FlatList
        data={inputRows}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <InputRowCard
            row={item}
            setInputRows={setInputRows}
            inputRows={inputRows}
            removeRow={removeRow}
          />
        )}
        ListFooterComponent={() => (
          <TouchableOpacity style={styles.roundButton} onPress={addRow}>
            <Text style={styles.plusText}>+</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleSaveMeal}>
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
