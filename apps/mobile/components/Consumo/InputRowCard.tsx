// InputRowCard.js
import React from "react"
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

export default function InputRowCard({ row, removeRow }) {
  return (
    <View style={styles.inputRow}>
      <TextInput style={styles.inputMaior} placeholder="Nome alimento" />
      <TextInput style={styles.imputMenor} placeholder="Gramas" />
      <TouchableOpacity onPress={() => removeRow(row.id)}>
        <MaterialIcons name="close" size={15} color="#8F898D" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10
  },
  inputMaior: {
    borderBottomWidth: 2,
    borderBottomColor: "#9C121E",
    paddingStart: 10,
    width: "60%"
  },
  imputMenor: {
    borderBottomWidth: 2,
    borderBottomColor: "#9C121E",
    paddingStart: 10,
    width: "26%"
  },
})
