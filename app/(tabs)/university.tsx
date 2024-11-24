import { View } from 'tamagui';
import { ReviewList } from 'components/university';
import { Error, Loading, NotFound, SearchBar } from 'components/common';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useFetchUniversityReviewListQuery } from 'redux/api';
import { useRouter } from 'expo-router';

export default function UniversityScreen() {
  const router = useRouter();

  const { data, error, isLoading } = useFetchUniversityReviewListQuery({
    cursor: '',
    limit: 10,
  });

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
