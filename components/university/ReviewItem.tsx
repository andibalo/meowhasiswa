import { View, Text, Image, XStack, YStack, Avatar } from 'tamagui';
import { FontAwesome } from '@expo/vector-icons';
import { IReview } from '../../types/model';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { StarRating } from 'components/common';

dayjs.extend(relativeTime); // Extend dayjs with relative time plugin

interface ReviewItemProps {
  review: IReview; // Use IReview type for the review prop
  rating: number;  // Rating is passed as a separate prop
}

export const ReviewItem = ({ review, rating }: ReviewItemProps) => {
    const timeAgo = dayjs(review.created_at).fromNow(); // Use dayjs to calculate relative time

    return (
        <View marginBottom={'$3'}>
            {/* University Info Section */}
            <View flexDirection="row" alignItems="center" marginBottom={'$2'}>
                <Avatar size="$5" mr={'$2'}>
                    <Avatar.Image
                        accessibilityLabel="University Logo"
                        src={review.university_image_url}
                        objectFit="contain"
                    />
                    <Avatar.Fallback backgroundColor="$blue10" />
                </Avatar>
                <View marginLeft={'$3'}>
                    <Text fontSize={16} fontWeight={'bold'} color="#030303">
                        {review.universityName}
                    </Text>
                    <Text fontSize={12} color="#030303">
                        {timeAgo} {/* Display relative time */}
                    </Text>
                </View>
            </View>
            <Text fontSize={12} color="#C5C5C5" marginBottom={'$2'}>
                {review.department}
            </Text>

            {/* Rating and Review Section */}
            <View marginBottom={'$3'}>
                <Text fontSize={24} fontWeight="bold" color="#030303" marginBottom={'$1'}>
                    {review.title}
                </Text>
                <View flexDirection="row" alignItems="center">
                    {/* Star Rating */}
                    <View flexDirection="row">
                        {Array.from({ length: 5 }, (_, i) => {
                            const isHalfStar = rating - i === 0.5;
                            const isFullStar = i < Math.floor(rating);
                            return (
                                <FontAwesome
                                    key={i}
                                    name={isFullStar ? 'star' : isHalfStar ? 'star-half-full' : 'star-o'}
                                    size={24}
                                    color="#FFD700"
                                />
                            );
                        })}
                    </View>
                    <Text fontSize={24} marginLeft={'$2'} color="#030303" fontWeight="bold">
                        {rating}
                    </Text>
                </View>
                <Text fontSize={14} color="#030303" marginTop={'$1'}>
                    {review.body}
                </Text>
            </View>

            {/* Pros and Cons Section */}
            <View marginBottom={'$3'}>
                <Text fontSize={16} fontWeight="bold" color="#030303" marginBottom={'$1'}>
                    Pros
                </Text>
                <View marginBottom={'$2'}>
                    {review.pros.map((pros, index) => (
                        <Text key={index} fontSize={14} color="#030303">
                        • {pros}
                        </Text>
                    ))}
                </View>

                <Text fontSize={16} fontWeight="bold" color="#030303" marginBottom={'$1'}>
                    Cons
                </Text>
                <View marginBottom={'$2'}>
                    {review.cons.map((con, index) => (
                        <Text key={index} fontSize={14} color="#030303">
                        • {con}
                        </Text>
                    ))}
                </View>
            </View>
            {/* Divider Line */}
            <View height={3} backgroundColor="#030303" marginBottom={'$3'} opacity={1} />
        </View>
    );
}
