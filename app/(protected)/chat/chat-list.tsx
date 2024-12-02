import { useEffect, useState } from "react";
import { FlatList, Pressable } from "react-native";
import { SizableText, XStack, YStack, Avatar } from "tamagui";
import { useNavigation } from "@react-navigation/native";
import { firestore } from "config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useFetchUserProfileQuery } from 'redux/api';

export default function ChatListScreen() {
  const { data, error, isLoading } = useFetchUserProfileQuery();
  const navigation = useNavigation();
  const [chatRooms, setChatRooms] = useState<any[]>([]);
  const userId = data?.data?.id;

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const roomsSnapshot = await getDocs(collection(firestore, "chatRooms"));
        const rooms = roomsSnapshot.docs.map((doc) => {
          const data = doc.data();
          const chatRoomId = doc.id;
          const [user1, user2] = chatRoomId.split("-");
          if (user1 === userId || user2 === userId) {
            return {
              id: chatRoomId,
              ...data,
            };
          }
          return null;
        }).filter(Boolean); 

        setChatRooms(rooms);
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      }
    };

    if (userId) {
      fetchChatRooms();
    }
  }, [userId]);

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => {
        // @ts-ignore
        navigation.navigate("chat/chat-detail", { chatRoomId: item.id });
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
            src={item.profilePic}
            objectFit="contain"
          />
          <Avatar.Fallback backgroundColor="$secondary" />
        </Avatar>
        <YStack flex={1}>
          <XStack justifyContent="space-between" alignItems="center">
            <XStack alignItems="center">
              <SizableText size="$5" fontWeight="bold" color="$primary">
                {item.university}
              </SizableText>
              <SizableText size="$3" marginLeft="$2" color="$secondary">
                {item.username}
              </SizableText>
            </XStack>
            <SizableText size="$1" color="$secondary">
              {item.timestamp}
            </SizableText>
          </XStack>
          <SizableText size="$4" color="$primary" numberOfLines={1}>
            {item.text}
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
        keyExtractor={(item) => item.id}
      />
    </YStack>
  );
}
