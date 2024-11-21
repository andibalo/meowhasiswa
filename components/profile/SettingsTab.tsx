import { LogOut } from '@tamagui/lucide-icons'
import { Pressable } from 'react-native'
import { setIsBiometricAuthEnabled, setToken } from 'redux/slice/auth'
import { RootState, useAppDispatch } from 'redux/store'
import { View, YStack, Text, Separator, XStack, Switch } from 'tamagui'
import * as SecureStore from 'expo-secure-store';
import { ENABLE_BIOMETRIC_AUTH_KEY, JWT_TOKEN_KEY } from 'constants/common'
import { useNavigation } from 'expo-router'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useToast } from 'hooks'
import * as LocalAuthentication from 'expo-local-authentication'

export const SettingsTab = () => {

    const isBiometricAuthEnabled = useSelector((state: RootState) => state.auth.isBiometricAuthEnabled)
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const toast = useToast()

    const handleLogOut = async () => {
        try {

            let token = await SecureStore.getItemAsync(JWT_TOKEN_KEY);
            if (token) {
                await SecureStore.deleteItemAsync(JWT_TOKEN_KEY);
            }

            dispatch(setToken(""))

            // @ts-ignore
            navigation.navigate("login")

        } catch (error) {

            toast.showToastError("Something went wrong", error)
        }
    }

    const handleToggleBiometricAuth = async (isChecked) => {

        try {
            console.log(isChecked, "CCC")
            if (isChecked) {
                console.log(isChecked, "DAWDWA")
                const isBiometricSupported = await LocalAuthentication.hasHardwareAsync()
                if (!isBiometricSupported) {
                    toast.showToastWarn("Your device does not support biometric functions")
                    return
                }

                console.log(isChecked, "DAWDWA")

                const savedBiometric = await LocalAuthentication.isEnrolledAsync()
                if (!savedBiometric) {
                    toast.showToastWarn("No biometric data found", "Kindly add your biometric data by going to the Settings of your device")
                    return
                }

                await AsyncStorage.setItem(ENABLE_BIOMETRIC_AUTH_KEY, String(isChecked));

                dispatch(setIsBiometricAuthEnabled({
                    isEnabled: isChecked,
                    shouldAuthenticate: true
                }))

                return
            }

            await AsyncStorage.setItem(ENABLE_BIOMETRIC_AUTH_KEY, String(isChecked));

            dispatch(setIsBiometricAuthEnabled({
                isEnabled: isChecked,
            }))

        } catch (error) {

            toast.showToastError("Something went wrong", error)
        }
    }

    return (
        <View bg="$background" borderRadius="$2">
            <YStack>
                <Pressable onPress={() => handleLogOut()}>
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
                <View>
                    <XStack p="$3" justifyContent="space-between">
                        <Text>Enable Biometric Lock</Text>
                        <Switch
                            checked={isBiometricAuthEnabled}
                            onCheckedChange={(isChecked) => handleToggleBiometricAuth(isChecked)}
                            size="$3"
                            bg={isBiometricAuthEnabled ? "$color" : "$gray7"}
                        >
                            <Switch.Thumb animation="quicker" />
                        </Switch>
                    </XStack>
                    <Separator />
                </View>
            </YStack>
        </View>
    )
}