import React from 'react';
import { View, Text, Image } from 'tamagui';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

// Placeholder components for tabs
function ProfileContentScreen() {
  return (
    <View flex={1} alignItems="center" justifyContent="center" backgroundColor="#ffffff">
      <Text>Profile Content</Text>
    </View>
  );
}

function PostsScreen() {
  return (
    <View flex={1} alignItems="center" justifyContent="center" backgroundColor="#ffffff">
      <Text>Posts Content</Text>
    </View>
  );
}

function CommentsScreen() {
  return (
    <View flex={1} alignItems="center" justifyContent="center" backgroundColor="#ffffff">
      <Text>Comments Content</Text>
    </View>
  );
}

export default function ProfileScreen() {
  return (
    <NavigationContainer>
      <View flex={1} padding="$4" backgroundColor="#ffffff">
        {/* User Info Section */}
        <View flexDirection="row" alignItems="center" justifyContent="space-between" marginBottom="$4" borderBottomWidth={1} borderBottomColor="#cccccc" paddingBottom="$3">
          <View flexDirection="row" alignItems="center">
            <Image
              source={require('assets/images/placeholder.png')}
              width={50}
              height={50}
              borderRadius={25}
              marginRight="$2"
            />
            <View>
              <Text fontSize={16} fontWeight="bold" color="#030303">
                UMN <Text fontSize={14} color="#C5C5C5">username12</Text>
              </Text>
              <Text fontSize={14} color="#030303">Informatika</Text>
            </View>
          </View>
          <Text fontSize={14} color="#030303">
            Joined Oktober 2024
          </Text>
        </View>

        {/* Material Top Tabs */}
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
          <Tab.Screen name="Profile" component={ProfileContentScreen} />
          <Tab.Screen name="Posts" component={PostsScreen} />
          <Tab.Screen name="Comments" component={CommentsScreen} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}