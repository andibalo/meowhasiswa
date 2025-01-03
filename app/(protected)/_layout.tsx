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
                    headerTitle: route.params?.message?.username || "Chat Detail",
                })}
            />
            <Stack.Screen
                name="thread/[id]"
                options={{
                    headerTitle: "Comments",
                }}
            />
            <Stack.Screen
                name="thread/create-thread"
                options={{
                    headerTitle: "Create Thread",
                }}
            />
            <Stack.Screen
                name="thread/edit-thread"
                options={{
                    headerTitle: "Edit Thread",
                }}
            />
            <Stack.Screen
                name="thread/select-subthread"
                options={{
                    headerTitle: "Select Subthread",
                    presentation: "modal"
                }}
            />
            <Stack.Screen
                name="subthread/create-subthread"
                options={{
                    headerTitle: "Create Submeow",
                }}
            />
            <Stack.Screen
                name="subthread/edit-subthread"
                options={{
                    headerTitle: "Edit Subthread",
                }}
            />
            <Stack.Screen
                name="university/[id]"
                options={{
                    headerTitle: "University Review",
                }}
            />
            <Stack.Screen
                name="university/rate-university"
                options={{
                    headerTitle: "Review University",
                }}
            />
            <Stack.Screen
                name="university/edit-rate-university"
                options={{
                    headerTitle: "Edit University Review",
                }}
            />
        </Stack>
    );
}