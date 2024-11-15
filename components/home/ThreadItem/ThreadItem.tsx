import { MessageSquare, ThumbsDown, ThumbsUp } from '@tamagui/lucide-icons';
import { Text, View, XStack, YStack, Avatar, Separator } from 'tamagui';
import { IThread } from 'types/model/thread';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface ThreadItemProps {
    thread: IThread;
}

export const ThreadItem = (props: ThreadItemProps) => {
    const thread = props.thread;

    return (
        <View mb={'$3'} p={'$3'} bg={'$white'} borderRadius={'$4'}>
            <YStack flex={1} justifyContent="space-between">
                {/* Header Section */}
                <XStack alignItems="center" mb={'$3'}>
                    <Avatar size="$5" mr={'$2'}>
                        <Avatar.Image
                            accessibilityLabel="University Logo"
                            src={thread.university_image_url}
                            objectFit="contain"
                        />
                        <Avatar.Fallback backgroundColor="$blue10" />
                    </Avatar>
                    <YStack>
                        <Text fontWeight="bold" fontSize={'$4'}>
                            {thread.university_abbreviated_name}
                        </Text>
                        <XStack gap="$2">
                            <Text fontSize={'$2'} color="#C5C5C5">
                                {thread.username}
                            </Text>
                            <Text fontSize={'$2'} color="#030303">
                                {dayjs(thread.created_at).fromNow()}
                            </Text>
                            <Text fontSize={'$2'} color="$blue10" backgroundColor="$blue2" borderRadius={'$2'} px={'$1'}>
                                m/{thread.subthread_name}
                            </Text>
                        </XStack>
                    </YStack>
                </XStack>

                {/* Title and Content */}
                <YStack mb={'$3'}>
                    <Text fontWeight="bold" fontSize={20} mb={'$2'} color="#030303">
                        {thread.title}
                    </Text>
                    <Text color="#030303" lineHeight={22}>
                        {thread.content}
                    </Text>
                </YStack>

                {/* Divider */}
                <View height={1} backgroundColor="#030303" mb={'$3'} />

                {/* TLDR Section */}
                <YStack mb={'$3'}>
                    <Text color="#030303" mb={'$1'}>
                        TLDR
                    </Text>
                    <Text color="#030303" lineHeight={22}>
                        {thread.content_summary}
                    </Text>
                </YStack>

                {/* Reactions Section */}
                <XStack justifyContent="flex-start" pt={'$3'}>
                    <XStack alignItems="center" mr={'$5'}>
                        <ThumbsUp color="#030303" />
                        <Text ml={'$1'} color="#030303">{thread.like_count}</Text>
                    </XStack>
                    <XStack alignItems="center" mr={'$5'}>
                        <ThumbsDown color="#030303" />
                        <Text ml={'$1'} color="#030303">{thread.dislike_count}</Text>
                    </XStack>
                    <XStack alignItems="center" mr={'$5'}>
                        <MessageSquare color="#030303" />
                        <Text ml={'$1'} color="#030303">{thread.comment_count}</Text>
                    </XStack>
                </XStack>
            </YStack>
        </View>
    );
};