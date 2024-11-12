import React, { useState } from 'react';
import { Button, Input, Stack, Text, YStack, XStack, Image } from 'tamagui';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = () => {
        console.log("Username:", username, "Password:", password);
    };

    return (
        <YStack
            f={1}
            jc="center"
            ai="center"
            padding="$4"
            bg="$background"
        >
            {/* Top Logo Section */}
            <YStack mb="$1" ai="center">
                <Image
                    source={require('../assets/images/meow-logo.png')}
                    width={260}
                    height={260}
                    resizeMode="contain"
                />
            </YStack>

            {/* Title */}
            <Text fontSize="$9" fontWeight="bold" color="$color" mb="$5">
                MeowHasiswa
            </Text>

            {/* Input Fields */}
            <Stack space="$2" width="80%">
                <Text fontSize="$3" color="$color" mb="$1">Username</Text>
                <Input
                    placeholder="Type your username"
                    value={username}
                    onChangeText={setUsername}
                    bg="$backgroundSoft"
                    padding="$3"
                    borderRadius="$2"
                />
                <Text fontSize="$3" color="$color" mt="$3">Password</Text>
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
                    Don't have an account?
                </Text>
                <Text
                    fontWeight="bold" // Make the "Register" text bold
                    onPress={() => navigation.navigate('register')} // Navigate to register screen
                    style={{ textDecorationLine: 'underline' }} // Optional: underline the "Register" text
                    ml="$2" // Add margin-left to create space between the two texts
                >
                    Register
                </Text>
            </XStack>

            {/* Login Button */}
            <XStack width="80%" jc="flex-end" mt="$5">
                <Button
                    onPress={handleLogin}
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
