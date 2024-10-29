import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

export default function PaginaConsumo() {
  return (
    <View style={styles.containerPage}>
      <Text style={styles.title}>Qual foi sua refeição?</Text>
      {/* card */}
      <View></View>
      {/* final card */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inputRowTitle}>
          <Text style={styles.title}>O que comeu?</Text>
          <Text style={styles.title}>Quantas gramas?</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <TextInput style={styles.inputMaior} placeholder="Nome alimento" />
            <TextInput style={styles.imputMenor} placeholder="Gramas" />
          </View>
          <View style={styles.inputRow}>
            <TextInput style={styles.inputMaior} placeholder="Nome alimento" />
            <TextInput style={styles.imputMenor} placeholder="Gramas" />
          </View>
          <View style={styles.inputRow}>
            <TextInput style={styles.inputMaior} placeholder="Nome alimento" />
            <TextInput style={styles.imputMenor} placeholder="Gramas" />
          </View>
        </View>
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
    justifyContent: "space-between" // Aligns children elements (ScrollView and button)
  },
  scrollContainer: {
    flexGrow: 1, // Allows ScrollView to grow
    justifyContent: "flex-start"
  },
  inputContainer: {
    flex: 1 // Makes the input container take available space
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    width: "30%"
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
    // Optional: Adds some margin from the bottom
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  }
})
