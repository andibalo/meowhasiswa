import { useEffect, useState } from "react";
import { FlatList, Pressable } from "react-native";
import { SizableText, XStack, YStack, Avatar } from "tamagui";
import { firestore } from "config/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { useFetchUserProfileQuery } from "redux/api";
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import React from "react";

interface ChatRoom {
  chatId: string;
  otherUserId: string;
  otherUsername: string;
  otherProfilePic: string;
  text: string;
  createdAt: any;
}

export default function ChatListScreen() {
  const { data, error, isLoading } = useFetchUserProfileQuery();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const userId = data?.data?.id;
  const router = useRouter();

  // Function to fetch chat rooms
  const fetchChatRooms = async () => {
    try {
      if (!userId) return;

      const chatsSnapshot = await getDocs(collection(firestore, "chats"));
      const rooms = await Promise.all(
        chatsSnapshot.docs.map(async (docSnapshot) => {
          const data = docSnapshot.data();
          const chatId = docSnapshot.id;
          const [user1, user2] = chatId.split("_");

          if (user1 === userId || user2 === userId) {
            const otherUserId = user1 === userId ? user2 : user1;
            const userProfile: ChatRoom = {
              chatId,
              otherUserId,
              otherUsername: user1 === userId ? data.user2 : data.user1,
              otherProfilePic: user1 === userId ? data.pfp2 : data.pfp1,
              text: "Loading...",
              createdAt: null,
            };

            setChatRooms((prevRooms) => {
              return prevRooms.map((room) =>
                room.chatId === chatId
                  ? { ...room, text: "Loading...", createdAt: null }
                  : room
              );
            });

            const messagesRef = collection(firestore, "chats", chatId, "messages");
            const lastMessageQuery = query(messagesRef, orderBy("createdAt", "desc"), limit(1));
            const lastMessageSnapshot = await getDocs(lastMessageQuery);

            if (!lastMessageSnapshot.empty) {
              const lastMessageData = lastMessageSnapshot.docs[0].data();
              userProfile.text = lastMessageData.text;
              userProfile.createdAt = lastMessageData.createdAt;
            }

            return userProfile;
          }
          return null;
        })
      );

      setChatRooms(rooms.filter((room) => room !== null) as ChatRoom[]);
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchChatRooms();
    }, [userId])
  );

  const renderItem = ({ item }: { item: ChatRoom }) => (
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
                {item.otherUsername}
              </SizableText>
            </XStack>
            <SizableText size="$1" color="$secondary">
              {item.createdAt?.toDate().toLocaleString() || "No messages yet"}
            </SizableText>
          </XStack>
          <SizableText size="$4" color="$primary" numberOfLines={1}>
            {item.text || "No message"}
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