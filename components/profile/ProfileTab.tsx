import { Pressable } from 'react-native'
import { View, YStack, Text, Separator, XStack } from 'tamagui'
import { useFetchUserProfileQuery } from 'redux/api'
import { Error, Loading, NotFound } from 'components/common'
import { useRouter } from 'expo-router'

export const ProfileTab = () => {

    const router = useRouter()
    const { data, error, isLoading } = useFetchUserProfileQuery();

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
    }

    const userProfile = data?.data;

    if (!userProfile) {
        return <NotFound description="User Profile Not Found" />;
    }

    const handleOnMyUniversityReviewPress = () => {
        if (!userProfile.has_rate_university) {
            router.push("/university/rate-university")
            return
        }

        router.push(`/university/${userProfile.university_rating_id}`)
    }

    return (
        <View bg="$background" borderRadius="$2">
            <YStack>
                <View>
                    <View p="$3">
                        <XStack alignItems="center" justifyContent="space-between" gap="$2">
                            <Text color="$primary" >Reputation Points</Text>
                            <Text color="$secondary" >{userProfile.reputation_points} points</Text>
                        </XStack>
                    </View>
                    <Separator />
                </View>
                <Pressable onPress={handleOnMyUniversityReviewPress}>
                    <View p="$3">
                        <XStack alignItems="center" justifyContent="space-between" gap="$2">
                            <Text color="$primary" >My University Review</Text>
                            {
                                !userProfile.has_rate_university && <Text color="$secondary">Not reviewed yet</Text>
                            }
                        </XStack>
                    </View>
                    <Separator />
                </Pressable>
            </YStack>
        </View>
    )
}