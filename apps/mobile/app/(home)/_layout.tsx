import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Tabs } from "expo-router"
import React from "react"

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"]
  color: string
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#9C121E",
        tabBarInactiveTintColor: "gray"
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />
        }}
      />

      <Tabs.Screen
        name="adicionarConsumo"
        options={{
          title: "Adicionar Consumo",
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Refazer Anamnesis",
          tabBarIcon: ({ color }) => <TabBarIcon name="list-alt" color={color} />
        }}
      />
    </Tabs>
  )
}
