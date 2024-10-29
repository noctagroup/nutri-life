import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native"

import google from "../../assets/images/Google.png"

interface OutlinedButtonProps {
  buttonText: string
}

export default function OutlinedButton({ buttonText }: OutlinedButtonProps) {
  return (
    <TouchableOpacity style={styles.button}>
      <Image
        source={{
          uri: "https://res.cloudinary.com/ds7amlveq/image/upload/v1729782757/google_baw1t2.png"
        }}
        style={{ width: 30, height: 30.5 }}
      />
      <Text style={styles.textButton}>{buttonText}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    flexDirection: "row",
    width: "45%",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#9C121E",
    marginTop: 40,
    alignItems: "center",
    justifyContent: "space-evenly"
  },

  textButton: {
    color: "#8F898D",
    fontWeight: "bold",
    fontSize: 12
  }
})
