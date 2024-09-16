import { Image, StyleSheet, Text, View } from "react-native"

export function CardFlexImage({
  title,
  content,
  image,
  selected
}: {
  title: string
  content: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any
  selected: boolean
}) {
  return (
    <View style={[styles.card, selected && styles.selectedCard]}>
      <Image style={styles.image} source={image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text>{content}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    width: "100%",
    height: 80,
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
    fontSize: 20
  },
  content: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    textAlign: "center",
    fontSize: 16
  },
  image: {
    width: 60
  }
})