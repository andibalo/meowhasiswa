import { View } from 'tamagui';
import { ReviewList } from 'components/university';
import { Error, Loading, NotFound, SearchBar } from 'components/common';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useFetchReviewListQuery } from 'redux/api';
import { useRouter } from 'expo-router';
import { IReview } from 'types/model';

const enableAPIIntegration = process.env.EXPO_PUBLIC_ENABLE_API_INTEGRATION;

export default function UniversityScreen() {
  const router = useRouter();

  // Static test data for fallback
  const testData: IReview[] = [
    {
      id: "e0b2e510-0492-479c-abb4-f1c9a044806a",
      user_id: "user123",
      username: "JohnDoe",
      university_id: "university123",
      university_image_url: "https://registrasi.untar.ac.id/assets/images/logo_untar.png",
      university_abbreviated_name: 'UMN',
      created_at: "2024-11-09T20:16:52.744793Z",
      created_by: "admin123",
      university_major: 'Informatika',
      title: 'Nice',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      pros: ['Lorem dawdawdaw', 'Ipsum dawdawdaw'],
      cons: ['Lorem dawdawdaw', 'Ipsum dawdawdaw'],
      overall_rating: 4.5,
      facility_rating: 4.0,
      student_organization_rating: 4.2,
      social_environment_rating: 4.8,
      education_quality_rating: 4.7,
      price_to_value_rating: 4.3,
    },
    {
      id: "f943486f-f534-49a6-8d5d-0b456b226f18",
      user_id: "user456",
      username: "JaneSmith",
      university_id: "university456",
      university_image_url: "https://registrasi.untar.ac.id/assets/images/logo_untar.png",
      university_abbreviated_name: 'UBM',
      created_at: "2024-11-09T19:33:28.384301Z",
      created_by: "admin456",
      university_major: 'Akuntansi',
      title: 'Overall good',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      pros: ['Lorem dawdawdaw', 'Ipsum dawdawdaw'],
      cons: ['Lorem dawdawdaw', 'Ipsum dawdawdaw'],
      overall_rating: 4.0,
      facility_rating: 3.8,
      student_organization_rating: 4.0,
      social_environment_rating: 4.1,
      education_quality_rating: 4.2,
      price_to_value_rating: 3.9,
    },
  ];

  // If API integration is disabled, show test data directly
  if (enableAPIIntegration === "0") {
    return (
      <View flex={1} p="$3" pb="0" bg="$backgroundSoft">
        <View mb="$3">
          <SearchBar placeholder="Search University" />
        </View>
        <View flex={1} bg="#ffffff" p="$3" pb="0">
          <ReviewList
            ListHeaderComponent={() => <View />}
            contentContainerStyle={{ paddingTop: 16 }}
            showsVerticalScrollIndicator={true}
            data={testData} // Pass testData to ReviewList
          />
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
          onPress={() => router.push('/review/rate-university')}
        >
          <FontAwesome name="plus" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );
  }

  // Fetch data from the backend if API integration is enabled
  const { data, error, isLoading } = useFetchReviewListQuery({
    cursor: '', // Pass initial cursor for pagination
    limit: 20,  // Default number of reviews to fetch
  });

  // Handle loading, error, and empty data states
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <View flex={1} p="$3" pb="0" bg="$backgroundSoft">
      {/* Search Bar */}
      <View mb="$3">
        <SearchBar placeholder="Search University" />
      </View>

      {/* Review List */}
      <View flex={1} bg="#ffffff" p="$3" pb="0">
        {data && data.data?.university_ratings && data.data?.university_ratings.length > 0 ? (
          <ReviewList
            ListHeaderComponent={() => <View />}
            contentContainerStyle={{ paddingTop: 16 }}
            showsVerticalScrollIndicator={true}
            data={data.data.university_ratings} // Pass reviews to ReviewList
          />
        ) : (
          <NotFound description="Reviews Not Found" />
        )}
      </View>

      {/* Floating Action Button */}
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
        onPress={() => router.push('/review/rate-university')}
      >
        <FontAwesome name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}
