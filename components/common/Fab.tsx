import { FontAwesome } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

interface IFabProps {
    onPress: () => void
}

export const Fab = (props: IFabProps) => {

    return (
        <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: "#000000",
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={props.onPress}
      >
        <FontAwesome name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    )
}