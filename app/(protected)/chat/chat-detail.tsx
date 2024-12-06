import { useState, useCallback, useEffect } from "react";
import { GiftedChat, Bubble, Day, Time, IMessage, Composer } from "react-native-gifted-chat";
import { Avatar, Button } from "tamagui";
import { Send } from "@tamagui/lucide-icons";
import { View } from "react-native";
import { firestore } from "config";
import { collection, addDoc, query, orderBy, onSnapshot, doc, getDoc, setDoc, getDocs } from "firebase/firestore";
import { useFetchUserProfileQuery } from 'redux/api';
import { useLocalSearchParams, useNavigation } from 'expo-router';

export default function ChatDetailScreen() {
  const { data, error, isLoading } = useFetchUserProfileQuery();
  const navigation = useNavigation();
  const { chatId } = useLocalSearchParams<{ chatId: string }>();

  const [messages, setMessages] = useState<IMessage[]>([]);

  // Fetch messages from Firestore
  useEffect(() => {
    if (!chatId) return;

    const messagesRef = collection(firestore, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages: IMessage[] = snapshot.docs.map((doc) => ({
        _id: doc.id,
        text: doc.data().text,
        createdAt: doc.data().createdAt.toDate(),
        user: {
          _id: doc.data().userId,
          name: doc.data().username,
          avatar: doc.data().profilePic,
        },
      }));
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [chatId]);

  // Handle sending messages
  const onSend = useCallback(async (newMessages: IMessage[] = []) => {
    if (!chatId || !data) return;
  
    const messagesRef = collection(firestore, "chats", chatId, "messages");
  
    try {
      // Check if the messages sub-collection exists by attempting to fetch a document
      const snapshot = await getDocs(messagesRef);
  
      // If the sub-collection is empty, add the first message (ensures its existence)
      if (snapshot.empty && newMessages.length > 0) {
        await addDoc(messagesRef, {
          text: newMessages[0].text,
          createdAt: new Date(),
          userId: data?.data?.id,
          username: data?.data?.username,
          profilePic: data?.data?.university?.image_url,
        });
  
        // Add remaining messages if any
        if (newMessages.length > 1) {
          const additionalWrites = newMessages.slice(1).map((m) =>
            addDoc(messagesRef, {
              text: m.text,
              createdAt: new Date(),
              userId: data?.data?.id,
              username: data?.data?.username,
              profilePic: data?.data?.university?.image_url,
            })
          );
          await Promise.all(additionalWrites);
        }
      } else {
        // If the sub-collection already exists, add all messages normally
        const writes = newMessages.map((m) =>
          addDoc(messagesRef, {
            text: m.text,
            createdAt: new Date(),
            userId: data?.data?.id,
            username: data?.data?.username,
            profilePic: data?.data?.university?.image_url,
          })
        );
        await Promise.all(writes);
      }
  
      // Append new messages to local state
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessages)
      );
    } catch (error) {
      console.error("Error sending messages:", error);
    }
  }, [chatId, data]);
  

  // Custom render components
  const renderBubble = (props: any) => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: "#6e6e6e",
          borderRadius: 10,
          padding: 5,
        },
        right: {
          backgroundColor: "#000",
          borderRadius: 10,
          padding: 5,
        },
      }}
      textStyle={{
        left: { color: "#fff" },
        right: { color: "#fff" },
      }}
    />
  );

  const renderAvatar = (props: any) => (
    <Avatar
      borderRadius={"$2"}
      borderWidth="$1"
      borderColor="$primary"
      marginRight="$2"
      size="$4"
    >
      <Avatar.Image
        accessibilityLabel="Profile Picture"
        src={props.currentMessage.user.avatar}
        objectFit="contain"
      />
      <Avatar.Fallback backgroundColor="$secondary" />
    </Avatar>
  );

  const renderDay = (props: any) => (
    <Day
      {...props}
      textStyle={{
        color: "#999",
        fontSize: 12,
        fontWeight: "600",
      }}
    />
  );

  const renderTime = (props: any) => (
    <Time
      {...props}
      textStyle={{
        left: { color: "#fff" },
        right: { color: "#fff" },
      }}
    />
  );

  const renderSend = (props: any) => (
    <Button
      size="$5"
      chromeless
      icon={<Send color="$primary" size="$1.5" />}
      onPress={() => onSend(props.messages)}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: "$primary" }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{ _id: String(data?.data?.id) }}
        inverted={false}
        renderBubble={renderBubble}
        renderAvatar={renderAvatar}
        renderDay={renderDay}
        renderTime={renderTime}
        showAvatarForEveryMessage
        renderSend={renderSend}
      />
    </View>
  );
}
