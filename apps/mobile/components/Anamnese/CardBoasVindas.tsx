import { Image, StyleSheet, Text, View } from "react-native"

export function CardBoasVindas() {
  const normalText = "Boas vindas ao"
  const title = "NutriLife!"

  return (
    <View style={[styles.card]}>
      {/* eslint-disable-next-line @typescript-eslint/no-require-imports */}
      <Image
        source={{
          uri: "https://res.cloudinary.com/ds7amlveq/image/upload/v1729783947/hello_wwslyo.png"
        }}
        style={{ width: 79.99, height: 80 }}
      />
      <View style={styles.content}>
        <Text style={styles.normalText}>Boas vindas ao</Text>
        <Text style={styles.title}>NutriLife!</Text>
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
    backgroundColor: "#9C121E",
    justifyContent: "center",
    width: "100%",
    height: 100,
    borderRadius: 30,
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
    fontSize: 40,
    color: "#FFFFFF"
  },
  normalText: {
    fontWeight: "regular",
    fontSize: 24,
    color: "#FFFFFF"
  },
  content: {
    color: "#FFFFFF",
    fontWeight: "bold",
    flex: 1,
    flexDirection: "column",
    width: "100%",
    textAlign: "center",
    fontSize: 40
  },
  image: {
    width: 80
  }
})
