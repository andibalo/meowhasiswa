import React from "react";
import { Text, View } from "tamagui";
import { FlatList, Image } from "react-native";

const messages = [
  {
    id: "1",
    university: "UBM",
    username: "tolecat",
    text: "Hey, how are you?",
    timestamp: "Kemarin",
    profilePic:
      "https://pacificgarden.co.id/wp-content/uploads/2021/10/Logo-UBM-Universitas-Bunda-Mulia-Original-1024x744.png",
  },
  {
    id: "2",
    university: "Untar",
    username: "catlover",
    text: "I am good, thanks! How about you?",
    timestamp: "12/03/2024",
    profilePic: "https://registrasi.untar.ac.id/assets/images/logo_untar.png",
  },
];

export default function ChatListScreen() {
  const renderItem = ({ item }) => (
    <View
      flexDirection="row"
      padding={10}
      marginBottom={10}
      backgroundColor="$background"
      borderRadius={10}
      shadowColor="$shadow"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={4}
    >
      <View flexDirection="row" flex={1} alignItems="center">
        <Image
          source={{ uri: item.profilePic }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 0,
            marginRight: 10,
            borderWidth: 2,
            borderColor: "black",
          }}
        />
        <View>
          <View flexDirection="row" alignItems="center">
            <Text fontSize={15} fontWeight="bold" color="$primary">
              {item.university}
            </Text>
            <Text fontSize={12} marginLeft={5} color="$primary">
              {item.username}
            </Text>
          </View>
          <Text color="$secondary">{item.text}</Text>
        </View>
      </View>
      <Text fontSize={12} color="$tertiary">
        {item.timestamp}
      </Text>
    </View>
  );
  
  return (
    <View flex={1} padding={20} backgroundColor="$background">
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
