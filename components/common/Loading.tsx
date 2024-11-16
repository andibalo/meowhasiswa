import { View, Spinner } from 'tamagui'

export const Loading = () => {

    return (
        <View flex={1} bg="$background" alignItems="center" justifyContent="center" >
            <Spinner size="large" />
        </View>
    )
}