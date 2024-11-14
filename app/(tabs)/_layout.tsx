import { Redirect, Tabs } from 'expo-router'
import { useTheme } from 'tamagui'
import { Home, School, User, MessagesSquare } from '@tamagui/lucide-icons'
import { RootState, useAppDispatch } from 'redux/store'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
import { JWT_TOKEN_KEY } from 'constants/common'
import { setToken } from 'redux/slice/auth'

export default function TabLayout() {

  const theme = useTheme()
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
          tabBarIcon: ({ color }) => <Home color={color} />
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
