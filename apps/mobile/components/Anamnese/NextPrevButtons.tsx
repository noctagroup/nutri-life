import { StyleSheet, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/Feather" 

interface PaginationButtonsProps {
  showNext?: boolean
  showPrevious?: boolean
  onNextPress?: () => void
  onPreviousPress?: () => void
}

export function PaginationButtons({
  showNext = false,
  showPrevious = false,
  onNextPress,
  onPreviousPress
}: PaginationButtonsProps) {
  const justifyContentStyle = showPrevious && showNext ? "space-between" : "center"

  return (
    <View style={[styles.container, { justifyContent: justifyContentStyle }]}>
      {showPrevious && (
        <TouchableOpacity style={styles.button} onPress={onPreviousPress}>
          {/* Replace the text with an icon */}
          <Icon name="chevron-left" size={24} color="#9C121E" />
        </TouchableOpacity>
      )}
      {showNext && (
        <TouchableOpacity style={styles.button} onPress={onNextPress}>
          {/* Replace the text with an icon */}
          <Icon name="chevron-right" size={24} color="#9C121E" />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 10
  },
  button: {
    backgroundColor: "#fff",
    padding: 15,
    height: 60,
    width: 60,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    justifyContent: "center", // Center the icon inside the button
    alignItems: "center"
  }
})
