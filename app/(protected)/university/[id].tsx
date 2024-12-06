import { View, ScrollView, Button, Text, YStack } from "tamagui";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useFetchUniversityReviewByIdQuery } from "redux/api";
import { BottomSheet, Error, Loading, NotFound } from "components/common";
import { ReviewItem } from "components/university";
import {
    BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { useCallback, useRef } from 'react';
import { Pressable } from "react-native";

export default function UniversityReviewDetailScreen() {
    const navigation = useNavigation();
    const { id } = useLocalSearchParams<{ id: string }>();

    if (!id) {
        navigation.goBack();
        return;
    }

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

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
                <Button
                    onPress={handlePresentModalPress}
                    color="black"
                />
                <BottomSheet ref={bottomSheetModalRef}>
                    <View p="$3">
                        <YStack gap="$3">
                            <Pressable>
                                <View p="$2">
                                    <Text>Edit Review</Text>
                                </View>
                            </Pressable>
                        </YStack>
                    </View>
                </BottomSheet>
            </ScrollView>
        </View>
    );
}