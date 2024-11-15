import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Input, Text, YStack, Button, XStack, styled, TextArea } from 'tamagui';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ThreadList } from 'components/home';

const Tab = createMaterialTopTabNavigator();

const Overlay = styled(View, {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'flex-end',
});

const PopupContainer = styled(YStack, {
  backgroundColor: '#FFFFFF',
  padding: 20,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  width: '100%',
});

export default function HomeScreen() {
  const router = useRouter(); // For navigation to the popup
  const renderSearchBar = () => (
    <View 
      flexDirection="row" 
      alignItems="center" 
      backgroundColor="#595959" 
      borderRadius={'$2'}
      paddingHorizontal={'$2'}
      paddingVertical={'$1'}
      marginBottom={'$3'}
    >
      <FontAwesome name="search" size={16} color="#FFFFFF" style={{ marginRight: 8, marginLeft: 10 }} />
      <Input
        placeholder="Search Thread"
        placeholderTextColor="#FFFFFF"
        backgroundColor="transparent"
        color="#FFFFFF"
        flex={1}
        borderWidth={0}
      />
    </View>
  );

  const blankSpace = () => <View></View>;

  const RenderTabScreen = () => (
    <View flex={1} backgroundColor="#FFFFFF">
      <ThreadList
        ListHeaderComponent={blankSpace}
        contentContainerStyle={{ paddingTop: 16 }}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );

  return (
    <View flex={1} backgroundColor="#FFFFFF" padding={'$3'}>
      {renderSearchBar()}

      {RenderTabScreen()}

      {/* Bottom-right button to open the modal */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: '#000000',
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => router.push('/newThread/NewThreadScreen')} // Navigate to new thread modal
      >
        <FontAwesome name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}