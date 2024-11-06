import { View, XStack } from 'tamagui';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from 'tamagui'

interface StarRatingProps {
    rating: number,
    maxStars?: number
}

const getStarTypes = (rating: number, maxStars: number) => {
    return [...Array(maxStars)].map((_, i) => {
        if (rating - i >= 1) {
            return 'star';
        }

        return rating - i >= 0.5 ? 'star-half-empty' : 'star-o';
    });
}


export const StarRating = ({ rating, maxStars = 5 }: StarRatingProps) => {

    const theme = useTheme()

    return (
        <XStack gap={'$1'}>
            {getStarTypes(rating, maxStars).map((starType, i) => {
                return (
                    <View key={`star-${i}`}>
                        <FontAwesome name={starType} size={18} color={theme.yellow10.val} />
                    </View>
                );
            })}
        </XStack>
    )
}