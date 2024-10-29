import { useRouter } from "expo-router"
import { useEffect } from "react"
import { Text, View } from "react-native"

import PaginaHome from "@/components/Home/Home"
import Anamnesis from "@/hooks/Anamnesis"
import Authorization from "@/hooks/Authorization"

export default function HomeIndex() {
  const router = useRouter()

  useEffect(() => {
    const handlePermissions = async () => {
      await Authorization.isAuthorized(router)
      await Anamnesis.hasAnamnesis(router)
    }

    handlePermissions()
  }, [router])

  return <PaginaHome />
}
