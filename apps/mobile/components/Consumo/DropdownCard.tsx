// DropdownCard.js
import React, { useState } from "react"
import { Image, StyleSheet, View } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"

export default function DropdownCard({ items, value, setValue }) {
  const [open, setOpen] = useState(false)

  return (
    <View style={[styles.dropdownContainer, open && { zIndex: 1000 }]}>
      <Image
        source={{
          uri: "https://res.cloudinary.com/ds7amlveq/image/upload/v1729794185/Breakfast_cg6dtn.png"
        }}
        style={{ width: 40, height: 40 }}
      />
      <View style={{ width: "60%" }}>
        <DropDownPicker
          placeholder="Selecione a refeição:"
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          style={{ borderColor: "white" }}
          dropDownContainerStyle={{
            zIndex: 1000,
            borderColor: "white"
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  dropdownContainer: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
    padding: 10,
    width: 220,
    height: 80,
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20
  }
})
