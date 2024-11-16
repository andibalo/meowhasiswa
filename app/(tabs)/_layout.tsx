import { Redirect, Tabs } from 'expo-router'
import { useTheme } from 'tamagui'
import { Home, School, User, MessagesSquare } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { Button } from 'tamagui'
import Ionicons from '@expo/vector-icons/Ionicons'
import { RootState, useAppDispatch } from 'redux/store'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
import { JWT_TOKEN_KEY } from 'constants/common'
import { setToken } from 'redux/slice/auth'

export default function TabLayout() {

  const theme = useTheme()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const token = useSelector((state: RootState) => state.auth.token)
  const enableAuthentication = process.env.EXPO_PUBLIC_ENABLE_AUTHENTICATION
  
  const getUserTokenFromStorage = async () => {
    let result = SecureStore.getItem(JWT_TOKEN_KEY);

    if (result) {
      dispatch(setToken(result))
    }
  };

  useEffect(() => {
    getUserTokenFromStorage();
  }, [])

  if(enableAuthentication == "1") {
    if (token === "") {
      return <Redirect href="/login" />;
    }
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
              size="small"
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
