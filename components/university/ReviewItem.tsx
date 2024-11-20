import { View, Text, Avatar } from 'tamagui';
import { IReview } from '../../types/model';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { StarRating } from 'components/common';

dayjs.extend(relativeTime);

interface ReviewItemProps {
    review: IReview;
}

export const ReviewItem = (props: ReviewItemProps) => { 
    const review = props.review
    const timeAgo = dayjs(review.created_at).fromNow();

    return (
        <View marginBottom={'$3'}>
            <View flexDirection="row" alignItems="center" marginBottom={'$2'}>
                <Avatar size="$4" mr={'$2'} borderRadius={'$2'} borderWidth="$1" borderColor="$primary">
                    <Avatar.Image
                        accessibilityLabel="University Logo"
                        src={review.university_image_url}
                        objectFit="contain"
                    />
                    <Avatar.Fallback backgroundColor="$blue10" />
                </Avatar>
                <View>
                    <Text fontSize={16} fontWeight={'bold'} color="$primary">
                        {review.university_abbreviated_name}
                    </Text>
                    <Text fontSize={12} color="$primary">
                        {timeAgo}
                    </Text>
                </View>
            </View>
            <Text fontSize={12} color="$secondary" marginBottom={'$2'}>
                {review.university_major}
            </Text>
            <View marginBottom={'$3'}>
                <Text fontSize={24} fontWeight="bold" color="$primary" marginBottom={'$1'}>
                    {review.title}
                </Text>
                <View flexDirection="row" alignItems="center">
                    <StarRating rating={review.overall_rating} />
                    <Text fontSize={24} marginLeft={'$2'} color="$primary" fontWeight="bold">
                        {review.overall_rating}
                    </Text>
                </View>
                <Text fontSize={14} color="$primary" marginTop={'$1'}>
                    {review.content}
                </Text>
            </View>
            <View marginBottom={'$3'}>
                <Text fontSize={16} fontWeight="bold" color="$primary" marginBottom={'$1'}>
                    Pros
                </Text>
                <View marginBottom={'$2'}>
                    {review.pros.map((pros, index) => (
                        <Text key={index} fontSize={14} color="$primary">
                            • {pros}
                        </Text>
                    ))}
                </View>

                <Text fontSize={16} fontWeight="bold" color="$primary" marginBottom={'$1'}>
                    Cons
                </Text>
                <View marginBottom={'$2'}>
                    {review.cons.map((con, index) => (
                        <Text key={index} fontSize={14} color="$primary">
                            • {con}
                        </Text>
                    ))}
                </View>
            </View>
            <View height={3} backgroundColor="$primary" marginBottom={'$3'} opacity={1} />
        </View>
    );
};