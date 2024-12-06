import { useEffect, useState } from "react";
import { FlatList, Pressable } from "react-native";
import { SizableText, XStack, YStack, Avatar } from "tamagui";
import { useNavigation } from "@react-navigation/native";
import { firestore } from "config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useFetchUserProfileQuery } from "redux/api";
import { useRouter } from 'expo-router';

export default function ChatListScreen() {
  const { data, error, isLoading } = useFetchUserProfileQuery();
  const navigation = useNavigation();
  const [chatRooms, setChatRooms] = useState<any[]>([]);
  const userId = data?.data?.id;

  const router = useRouter();

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        if (!userId) return;

        const chatsSnapshot = await getDocs(collection(firestore, "chats"));
        const rooms = await Promise.all(
          chatsSnapshot.docs.map(async (docSnapshot) => {
            const data = docSnapshot.data();
            const chatId = docSnapshot.id; // chatId is a combination of user1_user2
            const [user1, user2] = chatId.split("_");

            // Check if the current userId is part of the chatId (either user1 or user2)
            if (user1 === userId || user2 === userId) {
              const otherUserId = user1 === userId ? user2 : user1;
              const userProfile = {
                chatId,
                ...data,
                otherUserId,
                otherUsername: user1 === userId ? data.user2 : data.user1,
                otherProfilePic: user1 === userId ? data.pfp2 : data.pfp1,
              };
              return userProfile;
            }
            return null;
          })
        );
        
        // Filter out null values (rooms that didn't match the userId)
        setChatRooms(rooms.filter(Boolean));
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      }
    };

    fetchChatRooms();
  }, [userId]);

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => {
        console.log("Navigating with chatId:", item.chatId);
        router.push({
          pathname: '/chat/chat-detail',
          params: { chatId: item.chatId },
      });
      }}
    >
      <XStack flex={1} padding="$1" marginBottom="$4" alignItems="center">
        <Avatar
          borderRadius={"$2"}
          borderWidth="$1"
          borderColor="$primary"
          marginRight="$2"
          size="$5"
        >
          <Avatar.Image
            accessibilityLabel="Profile Picture"
            src={item.otherProfilePic}
            objectFit="contain"
          />
          <Avatar.Fallback backgroundColor="$secondary" />
        </Avatar>
        <YStack flex={1}>
          <XStack justifyContent="space-between" alignItems="center">
            <XStack alignItems="center">
              <SizableText size="$5" fontWeight="bold" color="$primary">
                {item.otherUsername} {/* Display the other user's username */}
              </SizableText>
            </XStack>
            <SizableText size="$1" color="$secondary">
              {item.createdAt?.toDate().toLocaleString()} {/* Format the createdAt field */}
            </SizableText>
          </XStack>
          <SizableText size="$4" color="$primary" numberOfLines={1}>
            {item.text} {/* Display the last message */}
          </SizableText>
        </YStack>
      </XStack>
    </Pressable>
  );

  return (
    <YStack flex={1} padding="$3" backgroundColor="$background">
      <FlatList
        data={chatRooms}
        renderItem={renderItem}
        keyExtractor={(item) => item.chatId}
        ListEmptyComponent={
          <SizableText color="$secondary">No chat rooms found</SizableText>
        }
      />
    </YStack>
  );
}
