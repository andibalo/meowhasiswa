import { Tabs } from 'expo-router'
import { useTheme } from 'tamagui'
import { Home, School, User, MessagesSquare } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { Button } from 'tamagui'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function TabLayout() {
  const theme = useTheme()
  const router = useRouter()

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
