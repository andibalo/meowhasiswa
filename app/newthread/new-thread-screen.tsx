import React from 'react';
import { View, Text, Input, TextArea, Button, XStack, YStack } from 'tamagui';
import { useNavigation } from 'expo-router';

export default function NewThreadScreen() {
  const navigation = useNavigation();

  const closeModal = () => {
    navigation.goBack();
  };

  return (
    <YStack flex={1} backgroundColor="#FFFFFF" padding={'$3'}>
      <Text fontSize={18} fontWeight="bold" marginBottom={10}>
        New Thread
      </Text>
      <Input placeholder="Title" borderColor="#C5C5C5" marginBottom={10} />
      <Input placeholder="Subthread" borderColor="#C5C5C5" marginBottom={10} />
      <TextArea
        placeholder="Content"
        borderColor="#C5C5C5"
        height={120}
        width="100%"
        marginBottom={10}
      />
      <TextArea
        placeholder="TLDR"
        borderColor="#C5C5C5"
        height={120}
        marginBottom={10}
      />
      <XStack justifyContent="space-between" marginTop={10}>
        <Button onPress={closeModal}>Cancel</Button>
        <Button onPress={closeModal}>Post</Button>
      </XStack>
    </YStack>
  );
}
