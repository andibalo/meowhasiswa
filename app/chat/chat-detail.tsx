import React, { useState, useCallback } from "react";
import { GiftedChat, Bubble, Day, Time } from "react-native-gifted-chat";
import { useRoute } from "@react-navigation/native";
import { Avatar } from "tamagui";
import { View } from "react-native";

export default function ChatDetailScreen() {
  const route = useRoute();
  const { message } = route.params;

  // Initialize chat with the first message
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: message.text,
      createdAt: new Date(),
      user: {
        _id: 2, // Message sender's ID
        name: message.username,
        avatar: message.profilePic,
      },
    },
  ]);

  // Handle sending new messages
  const onSend = useCallback((newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  }, []);

  // Custom Bubble Styling
  const renderBubble = (props) => {
    return (
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
  };

  // Custom Avatar Styling (replace the old renderAvatar with this one)
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

  // Custom Day Styling
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

  // Custom Time Styling
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
        onSend={(messages) => onSend(messages)} // Append new messages
        user={{
          _id: 1, // Current user ID
        }}
        renderBubble={renderBubble}
        renderAvatar={renderAvatar} // Use the updated renderAvatar here
        renderDay={renderDay}
        renderTime={renderTime}
        showAvatarForEveryMessage
      />
    </View>
  );
}
