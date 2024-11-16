import { Redirect, Stack } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

export default function ProtectedLayout() {

    const token = useSelector((state: RootState) => state.auth.token)
    const enableAuthentication = process.env.EXPO_PUBLIC_ENABLE_AUTHENTICATION

    if (enableAuthentication == "1") {
        if (token === "") {
            return <Redirect href="/login" />;
        }
    }

    return (
        <Stack>
             <Stack.Screen
            name="chat/chat-list"
            options={{
              headerTitle: "Chat",
            }}
          />
          <Stack.Screen
            name="chat/chat-detail"
            options={({ route }) => ({
              headerTitle: route.params?.message?.username || "Chat-detail",
            })}
          />
        </Stack>
    );
}