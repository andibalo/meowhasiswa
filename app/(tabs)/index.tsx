import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Input, Text, YStack, Button, XStack, styled, TextArea } from 'tamagui';
import { FontAwesome } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { ThreadList } from 'components/home';
import { Animated } from 'react-native';

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
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupPosition] = useState(new Animated.Value(300)); // Start the popup off-screen

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

  const openPopup = () => {
    setPopupVisible(true);
    Animated.spring(popupPosition, {
      toValue: 0, // Animate to position 0 (visible)
      useNativeDriver: true,
    }).start();
  };

  const closePopup = () => {
    Animated.spring(popupPosition, {
      toValue: 500, // Animate back off-screen
      useNativeDriver: true,
    }).start(() => setPopupVisible(false));
  };

  return (
    <NavigationContainer>  
      <View flex={1} backgroundColor="#FFFFFF" padding={'$3'}>
        {renderSearchBar()}

        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarLabel: ({ focused, color }) => (
              <Text style={{ fontSize: 14, fontWeight: focused ? 'bold' : 'normal', color }}>
                {route.name}
              </Text>
            ),
            tabBarIndicatorStyle: { backgroundColor: '#030303', height: 3 },
            tabBarActiveTintColor: '#030303',
            tabBarInactiveTintColor: '#C5C5C5',
            tabBarStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
          })}
        >
          <Tab.Screen name="Trending" component={RenderTabScreen} />
          <Tab.Screen name="Newest" component={RenderTabScreen} />
        </Tab.Navigator>

        {/* Bottom-right button to open the popup */}
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
          onPress={openPopup}
        >
          <FontAwesome name="plus" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Popup overlay and content */}
        {isPopupVisible && (
          <Overlay onPress={closePopup}>
            <Animated.View
              style={{
                transform: [{ translateY: popupPosition }],
                width: '100%',
              }}
            >
              <PopupContainer>
                <Text fontSize={18} fontWeight="bold" marginBottom={10}>
                  New Thread
                </Text>
                <Input
                  placeholder="Title"
                  borderColor="#C5C5C5"
                  marginBottom={10} />
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
                  marginBottom={10} />

                <XStack justifyContent="space-between" marginTop={10}>
                  <Button onPress={closePopup}>Cancel</Button>
                  <Button onPress={closePopup}>Post</Button>
                </XStack>
              </PopupContainer>
            </Animated.View>
          </Overlay>
        )}
      </View>
    </NavigationContainer>
  );
}