import { LogOut } from '@tamagui/lucide-icons'
import { Pressable } from 'react-native'
import { setToken } from 'redux/slice/auth'
import { useAppDispatch } from 'redux/store'
import { View, YStack, Text, Separator, XStack } from 'tamagui'
import * as SecureStore from 'expo-secure-store';
import { JWT_TOKEN_KEY } from 'constants/common'
import { useNavigation } from 'expo-router'

export const SettingsTab = () => {

    const dispatch = useAppDispatch()
    const navigation = useNavigation()

    const handlLogOut = async () => {
        try {

            let token = await SecureStore.getItemAsync(JWT_TOKEN_KEY);
            if (token) {
                await SecureStore.deleteItemAsync(JWT_TOKEN_KEY);
            }

            dispatch(setToken(""))

            // @ts-ignore
            navigation.navigate("login")

        } catch (error) {
            
            //TODO: show error toast
            console.log(error, "HANDLE_LOG_OUT")
        }
    }

    return (
        <View bg="$background" borderRadius="$2">
            <YStack>
                <Pressable onPress={() => handlLogOut()}>
                    <View p="$3">
                        <XStack alignItems="center" gap="$2">
                            <Text color="$red10Light" >Logout</Text>
                            <LogOut color="$red10Light" size="$1" />
                        </XStack>
                    </View>
                    <Separator />
                </Pressable>
                <View>
                    <View p="$3">
                        <Text>Version 0.1</Text>
                    </View>
                    <Separator />
                </View>
            </YStack>
        </View>
    )
}