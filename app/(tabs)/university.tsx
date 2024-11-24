import { View } from 'tamagui';
import { ReviewList } from 'components/university';
import { Error, Loading, NotFound, SearchBar } from 'components/common';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useFetchUniversityReviewListQuery } from 'redux/api';
import { useRouter } from 'expo-router';
import { useFetchUserProfileQuery } from "redux/api";
import { Text } from 'tamagui';

export default function UniversityScreen() {
  const router = useRouter();

  // Fetch the user profile
  const { data: userProfileData, error: userProfileError, isLoading: isUserProfileLoading } = useFetchUserProfileQuery();

  const { data, error, isLoading } = useFetchUniversityReviewListQuery({
    cursor: '',
    limit: 10,
  });

  // If user profile data is still loading, show loading indicator
  if (isUserProfileLoading) {
    return <Loading />;
  }

  const userProfile = userProfileData?.data;

  // If there is an error fetching user profile data, show error
  if (userProfileError) {
    return <Error />;
  }

  // Check the user profile fields
  const university_id = userProfile?.university_id;
  const has_rate_university = userProfile?.has_rate_university;

  // If the university_id is empty, show a message to register with a university email
  if (!university_id) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <Text>Please register with your university email first.</Text>
      </View>
    );
  }

  // If the user has not rated the university, show a message to rate the university
  if (!has_rate_university) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <Text>Please rate your university first.</Text>
      </View>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <View flex={1} p="$3" pb="0" bg="$backgroundSoft">
      <View mb="$3">
        <SearchBar placeholder="Search University" />
      </View>
      <View flex={1} bg="#ffffff" p="$3" pb="0">
        {data && data.data?.university_ratings && data.data?.university_ratings.length > 0 ? (
          <ReviewList
            ListHeaderComponent={() => <View />}
            contentContainerStyle={{ paddingTop: 16 }}
            showsVerticalScrollIndicator={true}
            data={data.data.university_ratings}
          />
        ) : (
          <NotFound description="Reviews Not Found" />
        )}
      </View>
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
        onPress={() => router.push('/university/rate-university')}
      >
        <FontAwesome name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}
