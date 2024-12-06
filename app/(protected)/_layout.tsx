import { Redirect, Stack } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { firestore } from "config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useFetchUserProfileQuery } from "redux/api";

export default function ProtectedLayout() {
    const { data, error, isLoading } = useFetchUserProfileQuery();
    const userId = data?.data?.id;
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
                name="university/[id]"
                options={{
                    headerTitle: "University Review",
                }}
            />
            <Stack.Screen
                name="university/rate-university"
                options={{
                    headerTitle: "Rate University",
                }}
            />
        </Stack>
    );
}