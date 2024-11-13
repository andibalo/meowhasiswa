import { View, Text, Image } from 'tamagui';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { ReviewList } from 'components/university';

const Tab = createMaterialTopTabNavigator();

// Placeholder components for tabs
function ProfileScreen() {
  return (
    <View flex={1} alignItems="center" justifyContent="center">
      <Text>Profile Content</Text>
    </View>
  );
}

function PostsScreen() {
  return (
    <View flex={1} alignItems="center" justifyContent="center">
      <Text>Posts Content</Text>
    </View>
  );
}

function CommentsScreen() {
  return (
    <View flex={1} alignItems="center" justifyContent="center">
      <Text>Comments Content</Text>
    </View>
  );
}

export default function UniversityScreen() {
  return (
    <View flex={1} padding="$3" backgroundColor="$white">
      {/* University Info Section */}
      <View flexDirection="row" alignItems="center" marginBottom="$3">
        <Image
          source={require('assets/images/placeholder.png')}
          width={50}
          height={50}
          borderRadius={25}
        />
        <View marginLeft="$3">
          <Text fontSize={16} fontWeight="bold" color="$black">
            UMN
          </Text>
          <Text fontSize={14} color="$gray">
            6 hours ago
          </Text>
          <Text fontSize={14} color="$gray">
            Informatika
          </Text>
        </View>
      </View>

      {/* Material Top Tabs */}
      <Tab.Navigator>
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Posts" component={PostsScreen} />
        <Tab.Screen name="Comments" component={CommentsScreen} />
      </Tab.Navigator>
    </View>
  );
}
