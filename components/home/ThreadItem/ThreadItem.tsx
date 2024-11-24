import { MessageSquare, ThumbsDown, ThumbsUp } from '@tamagui/lucide-icons';
import { Text, View, XStack, YStack, Avatar, Separator } from 'tamagui';
import { IThread } from 'types/model/thread';
import dayjs from 'dayjs';
import { Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useLikeThreadMutation, useDislikeThreadMutation, useDeleteThreadMutation } from 'redux/api/thread';

interface ThreadItemProps {
    thread: IThread;
    currentUserId?: string;
    inDetailScreen?: boolean;
}

export const ThreadItem = ({ thread, currentUserId, inDetailScreen }: ThreadItemProps) => {
    const router = useRouter();
    const [deleteThread] = useDeleteThreadMutation();
    const [likeThread] = useLikeThreadMutation();
    const [dislikeThread] = useDislikeThreadMutation();
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const handleLongPress = () => {
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
                                params: { id: thread.id },
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
        if (disliked) {
            setDisliked(false);
            await dislikeThread({ threadId: thread.id, dislike_count: Math.max(0, thread.dislike_count - 1) });
        }
        if (!liked) {
            setLiked(true);
            await likeThread({ threadId: thread.id, like_count: thread.like_count + 1 });
        } else {
            setLiked(false);
            await likeThread({ threadId: thread.id, like_count: Math.max(0, thread.like_count - 1) });
        }
    };
    
    const handleDislike = async () => {
        if (liked) {
            setLiked(false);
            await likeThread({ threadId: thread.id, like_count: Math.max(0, thread.like_count - 1) });
        }
        if (!disliked) {
            setDisliked(true);
            await dislikeThread({ threadId: thread.id, dislike_count: thread.dislike_count + 1 });
        } else {
            setDisliked(false);
            await dislikeThread({ threadId: thread.id, dislike_count: Math.max(0, thread.dislike_count - 1) });
        }
    };
    

    return (
        <Pressable
            onPress={() => router.push(`/thread/${thread.id}`)}
            onLongPress={handleLongPress}
        >
            <View p={'$2'} bg={'$white1'} borderRadius={'$radius.4'}>
                <YStack flex={1} justifyContent="space-between">
                    <View>
                        <XStack p={'$3'} jc={'space-between'}>
                            <View>
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
                            </View>
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
                                onPress={inDetailScreen ? handleLike : undefined}
                                color={liked ? 'green' : 'gray'}
                            />
                            <Text ml={'$2'}>{thread.like_count}</Text>
                        </XStack>
                        <XStack ai={'center'}>
                            <ThumbsDown
                                onPress={inDetailScreen ? handleDislike : undefined}
                                color={disliked ? 'red' : 'gray'}
                            />
                            <Text ml={'$2'}>{thread.dislike_count}</Text>
                        </XStack>
                    </XStack>
                </YStack>
            </View>
        </Pressable>
    );
};
