import { FlatList, TouchableOpacity } from "react-native";
import { SizableText, XStack, YStack, Avatar } from "tamagui";
import { useNavigation } from "@react-navigation/native";

const messages = [
  {
    id: "1",
    university: "UBM",
    username: "tolecat",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel augue nisl. Vestibulum pellentesque ante ex, eu molestie nulla malesuada eget. Nullam dapibus sit amet erat ac ornare.",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel augue nisl. Vestibulum pellentesque ante ex, eu molestie nulla malesuada eget. Nullam dapibus sit amet erat ac ornare.",
    timestamp: "Kemarin",
    profilePic:
      "https://pacificgarden.co.id/wp-content/uploads/2021/10/Logo-UBM-Universitas-Bunda-Mulia-Original-1024x744.png",
  },
  {
    id: "2",
    university: "Untar",
    username: "catlover",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel augue nisl. Vestibulum pellentesque ante ex, eu molestie nulla malesuada eget. Nullam dapibus sit amet erat ac ornare.",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel augue nisl. Vestibulum pellentesque ante ex, eu molestie nulla malesuada eget. Nullam dapibus sit amet erat ac ornare.",
    timestamp: "12/03/2024",
    profilePic: "https://registrasi.untar.ac.id/assets/images/logo_untar.png",
  },
];

export default function ChatListScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("chat/chat-detail", { message: item })}
    >
      <XStack padding="$1" marginBottom="$4" alignItems="center">
        <XStack flex={1} alignItems="center">
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
            <XStack alignItems="center">
              <SizableText size="$5" fontWeight="bold" color="$primary">
                {item.university}
              </SizableText>
              <SizableText size="$3" marginLeft="$2" color="$secondary">
                {item.username}
              </SizableText>
            </XStack>
            <SizableText size="$4" color="$primary" numberOfLines={1}>
              {item.text}
            </SizableText>
          </YStack>
        </XStack>
        <SizableText size="$1" color="$secondary">
          {item.timestamp}
        </SizableText>
      </XStack>
    </TouchableOpacity>
  );


  return (
    <YStack flex={1} padding="$4" backgroundColor="$background">
    <YStack flex={1} padding="$4" backgroundColor="$background">
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </YStack>
    </YStack>
  );
}
