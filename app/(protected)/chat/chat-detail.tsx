import { useState, useCallback, useEffect } from "react";
import { GiftedChat, Bubble, Day, Time, IMessage } from "react-native-gifted-chat";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Avatar } from "tamagui";
import { View } from "react-native";
import { firestore } from "config";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { useFetchUserProfileQuery } from 'redux/api';

// Define the type for the route parameters
type ChatDetailScreenParams = {
    message: {
        id: string;
        text: string;
        username: string;
        profilePic: string;
    };
};

// Define the navigation stack parameter list
type RootStackParamList = {
    ChatDetail: ChatDetailScreenParams;
};

export default function ChatDetailScreen() {
  const { data, error, isLoading } = useFetchUserProfileQuery();
  // Use the route hook with the typed parameter
  const route = useRoute<RouteProp<RootStackParamList, "ChatDetail">>();
  const { message } = route.params;

  // Correct typing for messages state using IMessage
  const [messages, setMessages] = useState<IMessage[]>([
      {
          _id: message.id,
          text: message.text,
          createdAt: new Date(),
          user: {
              _id: String(data?.data?.id),
              name: message.username,
              avatar: message.profilePic,
          },
      },
  ]);

  // Fetch messages from Firestore
  useEffect(() => {
    const messagesRef = collection(firestore, "chats", message.id, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const newMessages: IMessage[] = snapshot.docs.map((doc) => ({
            _id: doc.id, // Firestore IDs are strings
            text: doc.data().text,
            createdAt: doc.data().createdAt.toDate(),
            user: {
                _id: doc.data().userId, // Ensure ID is a string
                name: doc.data().username,
                avatar: doc.data().profilePic,
            },
        }));
        setMessages(newMessages);
    });

    return () => unsubscribe();
}, [message.id]);

// Send a new message
const onSend = useCallback(async (newMessages: IMessage[] = []) => {
    const writes = newMessages.map((m) =>
        addDoc(collection(firestore, "chats", message.id, "messages"), {
            text: m.text,
            createdAt: new Date(),
            userId: data?.data?.id,
            username: data?.data?.username,
            profilePic: data?.data?.university?.image_url,
        })
    );
    await Promise.all(writes);
    setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessages)
    );
}, [message.id]);

// Render the chat bubble
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
            left: {
                color: "#fff",
            },
            right: {
                color: "#fff",
            },
        }}
    />
);

// Render the avatar
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

// Render the day
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

// Render the time
const renderTime = (props: any) => (
    <Time
        {...props}
        textStyle={{
            left: {
                color: "#fff",
            },
            right: {
                color: "#fff",
            },
        }}
    />
);

return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
                _id: String(data?.data?.id),
            }}
            inverted={false}
            renderBubble={renderBubble}
            renderAvatar={renderAvatar}
            renderDay={renderDay}
            renderTime={renderTime}
            showAvatarForEveryMessage
        />
    </View>
  );
}