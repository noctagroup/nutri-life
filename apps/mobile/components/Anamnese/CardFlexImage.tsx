import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export function CardFlexImage({
  title,
  content,
  image,
  selected,
  onPress,
  imageWidth = 60, // Largura padrão
  imageHeight = 51.82 // Altura padrão
}: {
  title: string
  content: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any
  selected: boolean
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  onPress: Function
  imageWidth?: number // Adiciona largura dinâmica
  imageHeight?: number // Adiciona altura dinâmica
}) {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.selectedCard]}
      onPress={() => onPress()}>
      <Image style={{ width: imageWidth, height: imageHeight }} source={image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text>{content}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
    gap: 20,
    backgroundColor: "#fff",
    justifyContent: "center", // Centraliza a imagem e o conteúdo no eixo vertical
    alignItems: "center", // Centraliza o conteúdo verticalmente
    width: "100%",
    minHeight: 110,
    borderRadius: 15,
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: "#9C121E"
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "left" // Texto alinhado à esquerda
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center", // Centraliza o conteúdo no eixo vertical
    width: "100%",
    textAlign: "left", // Texto alinhado à esquerda
    fontSize: 16
  }
})
