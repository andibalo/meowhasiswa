import { MessageSquare, ThumbsDown, ThumbsUp } from '@tamagui/lucide-icons'
import { StarRating } from 'components/common'
import { Text, View, XStack, YStack, Avatar } from 'tamagui'


export const ReviewItem = () => {

    return (
        <View mb={'$3'} p={'$2'} pb={'$0'} bg={'$white1'} borderRadius={'$radius.4'} minHeight={300}>
            <XStack p={'$3'} jc={"space-between"}>
                <View>
                    <XStack mb={'$2'}>
                        <View mr={'$2'}>
                            <Avatar borderRadius={'$2'} size="$4">
                                <Avatar.Image
                                    accessibilityLabel="Cam"
                                    src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                                />
                                <Avatar.Fallback backgroundColor="$blue10" />
                            </Avatar>
                        </View>
                        <YStack jc={'space-between'}>
                            <XStack gap="$2">
                                <Text>UMN</Text>
                            </XStack>
                            <XStack>
                                <Text>4 hari lalu</Text>
                            </XStack>
                        </YStack>
                    </XStack>
                    <View>
                        <Text>
                            Informatika
                        </Text>
                    </View>
                </View>
            </XStack>
            <YStack pr={'$3'} pl={'$3'} pb={'$1.5'} gap="$1">
                <View mb={'$2'}>
                    <Text fontSize={'$7'}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elitqua
                    </Text>
                    <XStack gap={'$2'}>
                        <Text>
                            4.7
                        </Text>
                        <StarRating rating={4.7} />
                    </XStack>
                </View>
                <Text>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis a
                    ute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa
                </Text>
            </YStack>
            <View p={'$3'} pt={'$1.5'}>
                <Text>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Text>
            </View>
            <XStack pl={'$3'} pr={'$3'} pb={'$3'} gap={'$5'}>
                <XStack ai={'center'}>
                    <ThumbsUp />
                    <Text ml={'$2'} >3</Text>
                </XStack>
                <XStack ai={'center'}>
                    <ThumbsDown />
                    <Text ml={'$2'} >3</Text>
                </XStack>
                <XStack ai={'center'}>
                    <MessageSquare />
                    <Text ml={'$2'} >3</Text>
                </XStack>
            </XStack>
        </View>

    )
}