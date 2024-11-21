import { Redirect, Tabs } from 'expo-router'
import { useTheme } from 'tamagui'
import { Home, School, User, MessagesSquare } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { Button } from 'tamagui'
import Ionicons from '@expo/vector-icons/Ionicons'
import { RootState, useAppDispatch } from 'redux/store'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import * as LocalAuthentication from 'expo-local-authentication'
import * as SecureStore from 'expo-secure-store'
import { ENABLE_BIOMETRIC_AUTH_KEY, JWT_TOKEN_KEY } from 'constants/common'
import { setIsBiometricAuthEnabled, setIsBiometricAuthenticated, setToken } from 'redux/slice/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function TabLayout() {

  const theme = useTheme()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { token, isBiometricAuthEnabled, isBiometricAuthenticated } = useSelector((state: RootState) => state.auth)
  const enableAuthentication = process.env.EXPO_PUBLIC_ENABLE_AUTHENTICATION

  const getUserTokenFromStorage = async () => {
    let result = SecureStore.getItem(JWT_TOKEN_KEY);

    if (result) {
      dispatch(setToken(result))
    }
  };

  const getIsBiometricAuthEnabledFromStorage = async () => {
    let result = await AsyncStorage.getItem(ENABLE_BIOMETRIC_AUTH_KEY);

    if (result) {
      dispatch(setIsBiometricAuthEnabled({
        isEnabled: result === "true"
      }))
    }
  };

  const triggerBiometricLogin = async () => {
    try {

      const results = await LocalAuthentication.authenticateAsync();
      if (!results.success) {
        return triggerBiometricLogin()
      }

      if (results.success) {
        dispatch(setIsBiometricAuthenticated(true))
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserTokenFromStorage();
    getIsBiometricAuthEnabledFromStorage()
  }, [])

  if (enableAuthentication == "1") {
    if (token === "") {
      return <Redirect href="/login" />;
    }
  }

  if (isBiometricAuthEnabled && token !== "" && !isBiometricAuthenticated) {
    triggerBiometricLogin()
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary.val,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home color={color} />,
          headerRight: () => (
            <Button
              onPress={() => {
                router.push('/chat/chat-list')
              }}
              theme={theme.name}
              backgroundColor="white"
              borderRadius={8}
              paddingHorizontal={10}
              style={{
                backgroundColor: 'white',
                borderWidth: 0,
                borderColor: 'transparent',
              }}
            >
              <Ionicons name="chatbox-ellipses-outline" size={24} color={theme.primary.val} />
            </Button>
          ),
        }}
      />
      <Tabs.Screen
        name="subthread"
        options={{
          title: 'Submeow',
          tabBarIcon: ({ color }) => <MessagesSquare color={color} />,
        }}
      />
      <Tabs.Screen
        name="university"
        options={{
          title: 'University',
          tabBarIcon: ({ color }) => <School color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User color={color} />,
        }}
      />
    </Tabs>
  )
}
