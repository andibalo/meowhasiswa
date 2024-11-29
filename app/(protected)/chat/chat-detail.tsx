import { useState, useCallback, useEffect } from "react";
import { GiftedChat, Bubble, Day, Time } from "react-native-gifted-chat";
import { useRoute } from "@react-navigation/native";
import { Avatar } from "tamagui";
import { View } from "react-native";
import { firestore } from "../firebase"; // Adjust the path to your firebase.ts file
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore"; 

export default function ChatDetailScreen() {
  const route = useRoute();
  const { message } = route.params;

  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: message.text,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: message.username,
        avatar: message.profilePic,
      },
    },
  ]);

  // Fetch messages from Firestore
  useEffect(() => {
    const messagesRef = collection(firestore, 'chats', message.id, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => ({
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
  }, [message.id]);

  const onSend = useCallback(async (newMessages = []) => {
    const writes = newMessages.map(m =>
      addDoc(collection(firestore, 'chats', message.id, 'messages'), {
        text: m.text,
        createdAt: new Date(),
        userId: 1, // Replace with the actual user ID
        username: 'Current User', // Replace with actual username
        profilePic: 'profile-pic-url', // Replace with actual profile picture URL
      })
    );
    await Promise.all(writes);
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
  }, [message.id]);

  const renderBubble = (props) => (
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

  const renderAvatar = (props) => {
    if (props.currentMessage.user._id === 2) {
      return (
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
    }
    return null;
  };

  const renderDay = (props) => (
    <Day
      {...props}
      textStyle={{
        color: "#999",
        fontSize: 12,
        fontWeight: "600",
      }}
    />
  );

  const renderTime = (props) => (
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
          _id: 1,
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