import { ThumbsDown, ThumbsUp, Reply } from '@tamagui/lucide-icons'
import { Text, View, XStack, YStack, Avatar } from 'tamagui'
import { IComment } from 'types/model/thread'
import dayjs from 'dayjs'
import { Pressable } from 'react-native'

interface CommentItemProps {
    comment: IComment;
    canReply?: boolean;
}

export const CommentItem = ({ comment, canReply = true }: CommentItemProps) => {


    return (
        <View mb={'$3'} bg={'$white1'} borderRadius={'$radius.4'}>
            <YStack flex={1} justifyContent="space-between" gap="$3">
                <View>
                    <XStack mb="$3" jc={"space-between"}>
                        <View>
                            <XStack alignItems="center">
                                <View mr={'$2'}>
                                    <Avatar borderRadius={'$2'} borderWidth="$1" borderColor="$primary" size="$4">
                                        <Avatar.Image
                                            accessibilityLabel="Cam"
                                            src={comment.university_image_url}
                                            objectFit="contain"
                                        />
                                        <Avatar.Fallback backgroundColor="$secondary" />
                                    </Avatar>
                                </View>
                                <YStack gap="$1">
                                    <XStack gap="$2">
                                        <Text color="$primary" fontWeight="bold">{comment.university_abbreviated_name}</Text>
                                        <Text color="$secondary">{comment.username}</Text>
                                    </XStack>
                                    <XStack gap="$2" alignItems="center">
                                        <Text color="$primary" fontSize="$3">{dayjs(comment.created_at).format("YYYY-MM-DD")}</Text>
                                    </XStack>
                                </YStack>
                            </XStack>
                        </View>
                    </XStack>
                    <View>
                        <Text color="$primary">
                            {comment.content}
                        </Text>
                    </View>
                </View>
                <XStack gap={'$5'}>
                    <XStack ai={'center'}>
                        <ThumbsUp />
                        <Text ml={'$2'}>{comment.like_count}</Text>
                    </XStack>
                    <XStack ai={'center'}>
                        <ThumbsDown />
                        <Text ml={'$2'}>{comment.dislike_count}</Text>
                    </XStack>
                    {
                        canReply && <Pressable onPress={() => console.log("REPLY")} >
                            <XStack ai={'center'}>
                                <Reply />
                                <Text ml={'$2'}>Reply</Text>
                            </XStack>
                        </Pressable>
                    }
                </XStack>
            </YStack>
        </View>
    )
}