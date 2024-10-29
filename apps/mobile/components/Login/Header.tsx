import { Image, Text, View } from "react-native"

export default function Header() {
  return (
    <View
      style={{
        marginBottom: 50,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Image
        source={{
          uri: "https://res.cloudinary.com/ds7amlveq/image/upload/v1729782190/logo-nutrilife_1_jnuuih.png"
        }}
        style={{ marginTop: 30, width: 300, height: 143.96 }}
      />
      <Text style={{ color: "white", fontSize: 16, marginTop: 5 }}>
        Uma vida saudável começa aqui!{" "}
      </Text>
    </View>
  )
}
