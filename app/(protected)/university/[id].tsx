import { View, ScrollView } from "tamagui";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useFetchUniversityReviewByIdQuery } from "redux/api";
import { Error, Loading, NotFound } from "components/common";
import { ReviewItem } from "components/university";

export default function UniversityReviewDetailScreen() {
    const navigation = useNavigation();
    const { id } = useLocalSearchParams<{ id: string }>();

    if (!id) {
        navigation.goBack();
        return;
    }

    const { data, error, isLoading } = useFetchUniversityReviewByIdQuery(id);

    const universityReview = data?.data

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
    }

    if (!universityReview) {
        return <NotFound description="University Review Not Found" />
    }

    return (
        <View flex={1} backgroundColor="$background">
            <ScrollView>
                <ReviewItem review={universityReview} showMoreOptionsBtn />
            </ScrollView>
        </View>
    );
}