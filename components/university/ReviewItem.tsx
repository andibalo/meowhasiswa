import { View, Text, Avatar, YStack, XStack } from 'tamagui';
import { IUniversityReview } from '../../types/model';
import { StarRating } from 'components/common';
import { formateDateWithDaysAgoThreshold } from 'utils';
import { Ellipsis } from '@tamagui/lucide-icons';
import { Pressable } from 'react-native';

interface IUniversityReviewItemProps {
    review: IUniversityReview;
    showMoreOptionsBtn?: boolean
    openReviewBottomSheet?: () => void
}

export const ReviewItem = ({
    review,
    showMoreOptionsBtn = false,
    openReviewBottomSheet
}: IUniversityReviewItemProps) => {

    return (
        <View p={'$4'} bg={'$white1'} borderRadius={'$radius.4'}>
            <XStack alignItems="center" justifyContent="space-between">
                <View flexDirection="row" alignItems="center" marginBottom={'$2'}>
                    <Avatar
                        size="$4"
                        mr={'$2'}
                        borderRadius={'$2'}
                        borderWidth={1}
                        borderColor="$secondary"
                    >
                        <Avatar.Image
                            accessibilityLabel="University Logo"
                            src={review.university_image_url}
                            objectFit="contain"
                        />
                        <Avatar.Fallback backgroundColor="$blue10" />
                    </Avatar>
                    <View>
                        <Text fontSize={'$5'} fontWeight={'bold'} color="$primary">
                            {review.university_abbreviated_name}
                        </Text>
                        <Text fontSize="$2" color="$primary">
                            {formateDateWithDaysAgoThreshold(review.created_at, 3)}
                        </Text>
                    </View>
                </View>
                {
                    showMoreOptionsBtn &&
                    <Pressable onPress={openReviewBottomSheet} >
                        <View p="$2">
                            <Ellipsis size="$1" />
                        </View>
                    </Pressable>
                }
            </XStack>
            <Text fontSize="$3" color="$secondary" marginBottom={'$2'}>
                {review.university_major}
            </Text>
            <View marginBottom={'$3'}>
                <Text fontSize="$7" fontWeight="bold" color="$primary" marginBottom={'$1'}>
                    {review.title}
                </Text>
                <View flexDirection="row" alignItems="center">
                    <StarRating rating={review.overall_rating} />
                    <Text fontSize="$7" marginLeft={'$2'} color="$primary" fontWeight="bold">
                        {review.overall_rating}
                    </Text>
                </View>
                <Text fontSize={'$4'} color="$primary" marginTop={'$1'}>
                    {review.content}
                </Text>
            </View>
            <View>
                <Text fontSize={"$5"} fontWeight="bold" color="$primary">
                    Pros
                </Text>
                <YStack gap="$1" mb="$2">
                    {review.pros.map((pros, index) => (
                        <Text key={index} fontSize={'$4'} color="$primary">
                            • {pros}
                        </Text>
                    ))}
                </YStack>
                <Text fontSize={"$5"} fontWeight="bold" color="$primary">
                    Cons
                </Text>
                <YStack gap="$1">
                    {review.cons.map((con, index) => (
                        <Text key={index} fontSize={'$4'} color="$primary">
                            • {con}
                        </Text>
                    ))}
                </YStack>
            </View>
            {
                review.updated_at &&
                <View mt="$3">
                    <Text color="$secondary">Last modified {formateDateWithDaysAgoThreshold(review.updated_at, 3)}</Text>
                </View>
            }
        </View>
    );
};