import { Pressable } from 'react-native'
import { View, YStack, Text, Separator, XStack } from 'tamagui'
import { useRouter } from 'expo-router'
import { IUser } from 'types/model'

interface IProfileThreadTabProps {
    userProfile: IUser;
}

export const ProfileTab = (props: IProfileThreadTabProps) => {

    const router = useRouter()

    const { userProfile } = props

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