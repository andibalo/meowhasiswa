import { View, Text } from "tamagui";
import { ReviewList } from "components/university";
import { Error, Fab, Loading, NotFound, SearchBar } from "components/common";
import { FontAwesome } from "@expo/vector-icons";
import {
  useFetchUniversityReviewListQuery,
  useFetchUserProfileQuery,
} from "redux/api";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function UniversityScreen() {

  const router = useRouter();
  const [searchInput, setSearchInput] = useState("")
  const [query, setQuery] = useState("")

  const {
    data: userProfile,
    isLoading: isUserProfileLoading,
    error: errorUserProfile,
  } = useFetchUserProfileQuery();

  const { data, error, isLoading } = useFetchUniversityReviewListQuery({
    cursor: "",
    limit: 10,
    _q: query
  });

  const handleSubmitSearch = () => {
    setQuery(searchInput)
  }

  const onChangeText = (data) => {
    setSearchInput(data)
  }

  if (isLoading || isUserProfileLoading) {
    return <Loading />;
  }

  if (error || errorUserProfile) {
    return <Error />;
  }

  const uniRatings = data?.data?.university_ratings

  if (!uniRatings || (uniRatings && uniRatings.length === 0)) {
    return <NotFound description='University Ratings Not Found' />
  }

  const hasRateUniversity = userProfile?.data?.has_rate_university;
  const universityId = userProfile?.data?.university_id;

  return (
    <View flex={1} p="$3" pb="0" bg="$backgroundSoft">
      <View mb="$3">
        <SearchBar
          placeholder="Search University"
          value={searchInput}
          onChangeText={(data) => onChangeText(data)}
          onSubmitEditing={() => handleSubmitSearch()}
        />
      </View>
      {universityId && !hasRateUniversity ? (
        <View
          flex={1}
          jc="center"
          ai="center"
          px="$5"
        >
          <FontAwesome name="exclamation-circle" size={40} color="$primary" />
          <View mt="$2">
            <Text fontSize="$5" textAlign="center">
              You must review your university first before accessing this
              screen.
            </Text>
          </View>
        </View>
      ) : (
        <ReviewList
          data={uniRatings}
        />
      )}
      {universityId && !hasRateUniversity &&
        <Fab onPress={() => router.push("/university/rate-university")} />
      }
    </View>
  );
}
