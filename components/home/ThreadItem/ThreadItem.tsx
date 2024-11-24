import { Edit3, MessageSquare, ThumbsDown, ThumbsUp } from '@tamagui/lucide-icons';
import { Text, View, XStack, YStack, Avatar, Separator } from 'tamagui';
import { IThread } from 'types/model/thread';
import dayjs from 'dayjs';
import { Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useLikeThreadMutation, useDislikeThreadMutation, useDeleteThreadMutation } from 'redux/api/thread';
import { useToast } from 'hooks';

interface ThreadItemProps {
    thread: IThread;
    currentUserId?: string;
    inDetailScreen?: boolean;
    enableEditItem?: boolean
}

export const ThreadItem = ({ thread, currentUserId, inDetailScreen, enableEditItem }: ThreadItemProps) => {
    const router = useRouter();
    const [deleteThread] = useDeleteThreadMutation();
    const [likeThread] = useLikeThreadMutation();
    const [dislikeThread] = useDislikeThreadMutation();
    const toast = useToast()

    const handleEditItem = () => {

        if (!enableEditItem) {
            return
        }

        if (currentUserId && thread.user_id === currentUserId) {
            Alert.alert(
                'Thread Actions',
                'Choose an action for your thread:',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Edit',
                        onPress: () =>
                            router.push({
                                pathname: '/thread/edit-thread',
                                params: { id: thread.id, subThreadId: thread.subthread_id },
                            }),
                    },
                    { text: 'Delete', onPress: handleDelete },
                ],
                { cancelable: true }
            );
        }
    };

    const handleDelete = async () => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this thread? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteThread(thread.id).unwrap();
                            Alert.alert('Success', 'Thread deleted successfully.');
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete the thread.');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const handleLike = async () => {
        try {
            await likeThread(thread.id);
        } catch (error) {
            console.log("LIKE THREAD:", error)
            toast.showToastError("Something Went Wrong", "Cannot like thread")
        }
    };

    const handleDislike = async () => {
        try {
            await dislikeThread(thread.id);
        } catch (error) {
            console.log("DISLIKE THREAD:", error)
            toast.showToastError("Something Went Wrong", "Cannot dislike thread")
        }
    };

    return (
        <Pressable
            onPress={() => {
                if (inDetailScreen) {
                    return
                }

                router.push(`/thread/${thread.id}`)
            }}
        >
            <View p={'$2'} bg={'$white1'} borderRadius={'$radius.4'}>
                <YStack flex={1} justifyContent="space-between">
                    <View>
                        <XStack p={'$3'} jc={'space-between'} alignItems="center">
                            <XStack alignItems="center">
                                <View mr={'$2'}>
                                    <Avatar borderRadius={'$2'} borderWidth="$1" borderColor="$primary" size="$4">
                                        <Avatar.Image
                                            accessibilityLabel="University"
                                            src={thread.university_image_url}
                                            objectFit="contain"
                                        />
                                        <Avatar.Fallback backgroundColor="$secondary" />
                                    </Avatar>
                                </View>
                                <YStack gap="$1">
                                    <XStack gap="$2">
                                        <Text color="$primary" fontWeight="bold">
                                            {thread.university_abbreviated_name}
                                        </Text>
                                        <Text color="$secondary">{thread.username}</Text>
                                    </XStack>
                                    <XStack gap="$2" alignItems="center">
                                        <Text color="$primary" fontSize="$3">
                                            {dayjs(thread.created_at).format('YYYY-MM-DD')}
                                        </Text>
                                        <View bg="#4E96EB" px="$2" py="$1" borderRadius="$1">
                                            <Text color="white" fontSize="$2">{`m/${thread.subthread_name}`}</Text>
                                        </View>
                                    </XStack>
                                </YStack>
                            </XStack>
                            {
                                enableEditItem && (
                                    <Pressable onPress={handleEditItem}>
                                        <View p="$2">
                                            <Edit3 />
                                        </View>
                                    </Pressable>
                                )
                            }
                        </XStack>
                        <YStack pr={'$3'} pl={'$3'} pb={'$1.5'} gap="$1">
                            <Text color="$primary" fontSize={'$6'} fontWeight="bold">
                                {thread.title}
                            </Text>
                            <Text color="$primary">{thread.content}</Text>
                        </YStack>
                        <View px="$3">
                            <Separator marginVertical="$2" />
                        </View>
                        <View p={'$3'} pt={'$1.5'} pb={'$1.5'}>
                            <Text color="$primary">TLDR</Text>
                        </View>
                        <View p={'$3'} pt={'$1.5'}>
                            <Text color="$primary">{thread.content_summary}</Text>
                        </View>
                    </View>
                    <XStack pl={'$3'} pr={'$3'} pb={'$3'} gap={'$5'}>
                        <XStack ai={'center'}>
                            <ThumbsUp
                                onPress={inDetailScreen ? handleLike : () => null}
                            />
                            <Text ml={'$2'}>{thread.like_count}</Text>
                        </XStack>
                        <XStack ai={'center'}>
                            <ThumbsDown
                                onPress={inDetailScreen ? handleDislike : () => null}
                            />
                            <Text ml={'$2'}>{thread.dislike_count}</Text>
                        </XStack>
                        <XStack ai={'center'}>
                            <MessageSquare />
                            <Text ml={'$2'}>{thread.comment_count}</Text>
                        </XStack>
                    </XStack>
                </YStack>
            </View>
        </Pressable>
    );
};
