import { Tabs } from 'expo-router'
import { useTheme } from 'tamagui'
import { Home, School, User, MessagesSquare } from '@tamagui/lucide-icons'

export default function TabLayout() {
  const theme = useTheme()

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
