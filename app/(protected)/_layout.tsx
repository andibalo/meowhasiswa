import { Redirect, Stack } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

export default function ProtectedLayout() {

    const token = useSelector((state: RootState) => state.auth.token)

    if (token === "") {
        return <Redirect href="/login" />;
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
            />
        </Stack>
    );
}