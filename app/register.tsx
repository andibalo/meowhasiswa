import React, { useState } from "react";
import { Button, Input, Stack, Text, YStack, XStack, Image } from "tamagui";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    console.log("Username:", username, "Email:", email, "Password:", password);
  };

  return (
    <YStack f={1} jc="center" ai="center" padding="$4" bg="$background">
      <YStack mb="$1" ai="center">
        <Image
          source={require("../assets/images/meow-logo.png")}
          width={260}
          height={260}
          resizeMode="contain"
        />
      </YStack>
      <Text fontSize="$9" fontWeight="bold" color="$color" mb="$5">
        MeowHasiswa
      </Text>
      <Stack space="$2" width="80%">
        <Text fontSize="$3" color="$color" mb="$1">
          Username
        </Text>
        <Input
          placeholder="Type your username"
          value={username}
          onChangeText={setUsername}
          bg="$backgroundSoft"
          padding="$3"
          borderRadius="$2"
        />
        <Text fontSize="$3" color="$color" mb="$1">
          Email
        </Text>
        <Input
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          bg="$backgroundSoft"
          padding="$3"
          borderRadius="$2"
        />
        <Text fontSize="$3" color="$color" mt="$3">
          Password
        </Text>
        <Input
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          bg="$backgroundSoft"
          padding="$3"
          borderRadius="$2"
        />
      </Stack>
      <XStack mt="$3" ai="center">
        <Text fontSize="$3" color="$color">
          Already have an account?
        </Text>
        <Text
          fontWeight="bold"
          onPress={() => navigation.navigate("login")}
          style={{ textDecorationLine: "underline" }}
          ml="$2"
        >
          Login
        </Text>
      </XStack>
      <XStack width="80%" jc="flex-end" mt="$5">
        <Button
          onPress={handleRegister}
          bg="$primary"
          padding="$3"
          borderRadius="$3"
          width={48}
          height={48}
          ai="center"
          jc="center"
        >
          <FontAwesome name="arrow-right" size={20} color="#fff" />
        </Button>
      </XStack>
    </YStack>
  );
}
