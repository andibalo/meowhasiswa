import React from 'react';
import { View, Input, Text } from 'tamagui';
import { FontAwesome } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { ThreadList } from 'components/home';

const Tab = createMaterialTopTabNavigator();

export default function HomeScreen() {
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
        placeholder="Placeholder. Search goes here later."
        placeholderTextColor="#FFFFFF"
        backgroundColor="transparent"
        color="#FFFFFF"
        flex={1}
        borderWidth={0}
      />
    </View>
  );

  const blankSpace = () => <View></View>;

  {/* Temporary placeholder */}
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
    <NavigationContainer>  
      <View flex={1} backgroundColor="#FFFFFF" padding={'$3'}>
        {/* Render the fixed search bar above the navigation */}
        {renderSearchBar()}

        {/* Tab Navigator below the search bar */}
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
      </View>
    </NavigationContainer>
  );
}