import { Edit3, MessageSquare } from '@tamagui/lucide-icons';
import { Text, View, XStack, YStack, Avatar, Separator } from 'tamagui';
import { IThread } from 'types/model/thread';
import { Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useLikeThreadMutation, useDislikeThreadMutation, useDeleteThreadMutation } from 'redux/api/thread';
import { useToast } from 'hooks';
import Ionicons from '@expo/vector-icons/Ionicons';
import { formateDateWithDaysAgoThreshold } from 'utils';
import { useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { firestore } from 'config';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

interface ThreadItemProps {
    thread: IThread;
    currentUserId?: string;
    inDetailScreen?: boolean;
    enableEditItem?: boolean;
    currentUserId2?: string;
}

export const ThreadItem = ({ thread, currentUserId, inDetailScreen, enableEditItem, currentUserId2 }: ThreadItemProps) => {
    const router = useRouter();
    const [deleteThread] = useDeleteThreadMutation();
    const [likeThread] = useLikeThreadMutation();
    const [dislikeThread] = useDislikeThreadMutation();
    const toast = useToast();
    const [isSheetVisible, setSheetVisible] = useState(false);

    const handleEditItem = () => {
        if (!enableEditItem) {
            return;
        }
        else if (enableEditItem) {
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
            console.log("LIKE THREAD:", error);
            toast.showToastError("Something Went Wrong", "Cannot like thread");
        }
    };

    const handleDislike = async () => {
        try {
            await dislikeThread(thread.id);
        } catch (error) {
            console.log("DISLIKE THREAD:", error);
            toast.showToastError("Something Went Wrong", "Cannot dislike thread");
        }
    };

    const handleChat = async () => {
        // Check if a chat already exists between currentUserId2 and thread.user_id
        const chatId = `${currentUserId2}_${thread.user_id}`;
        const chatsRef = collection(firestore, 'chats');
        const q = query(chatsRef, where('chat-id', '==', chatId));

        const chatQuerySnapshot = await getDocs(q);

        if (chatQuerySnapshot.empty) {
            // If no chat is found, create a new one
            try {
                const newChatRef = await addDoc(chatsRef, {
                    chatId,
                    createdAt: new Date(),
                });

                // Redirect to ChatDetailScreen with the newly created chat ID
                router.push({
                    pathname: '/chat/chat-detail',
                    params: { chatId: newChatRef.id },
                });
            } catch (error) {
                toast.showToastError("Something Went Wrong", "Failed to create chat");
            }
        } else {
            // If a chat exists, use the existing chat ID
            const existingChatId = chatQuerySnapshot.docs[0].id;
            router.push({
                pathname: '/chat/chat-detail',
                params: { chatId: existingChatId },
            });
        }
    };

    return (
        <>
            <Pressable
                onPress={() => {
                    if (!inDetailScreen) {
                        router.push(`/thread/${thread.id}`);
                    }
                }}
            >
                <View p={'$2'} bg={'$white1'} borderRadius={'$radius.4'}>
                    <YStack flex={1} justifyContent="space-between">
                        <View>
                            <XStack p={'$3'} jc={'space-between'} alignItems="center">
                                <XStack alignItems="center">
                                    <View mr={'$2'}>
                                        <Pressable onPress={() => {
                                            if (currentUserId2 && thread.user_id !== currentUserId2) {
                                                setSheetVisible(true);
                                            }
                                            else {
                                                console.log("Cannot open bottom sheet: User is the same.");
                                                console.log("Current User ID:", currentUserId2);
                                                console.log("Thread User ID:", thread.user_id);
                                            }
                                        }}>
                                            <Avatar borderRadius={'$2'} borderWidth="$1" borderColor="$primary" size="$4">
                                                <Avatar.Image
                                                    accessibilityLabel="University"
                                                    src={thread.university_image_url}
                                                    objectFit="contain"
                                                />
                                                <Avatar.Fallback backgroundColor="$secondary" />
                                            </Avatar>
                                        </Pressable>
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
                                                {formateDateWithDaysAgoThreshold(thread.created_at, 3)}
                                            </Text>
                                            <View bg={thread.subthread_color ? thread.subthread_color : "$primary"} px="$2" py="$1" borderRadius="$1">
                                                <Text color="white" fontSize="$2">{`m/${thread.subthread_name}`}</Text>
                                            </View>
                                        </XStack>
                                    </YStack>
                                </XStack>
                                {enableEditItem && (
                                    <Pressable onPress={handleEditItem}>
                                        <View p="$2">
                                            <Edit3 />
                                        </View>
                                    </Pressable>
                                )}
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
                                <Ionicons
                                    name={thread.is_liked ? "paw" : "paw-outline"}
                                    onPress={inDetailScreen ? handleLike : () => null}
                                    size={26}
                                    color="black"
                                />
                                <Text ml={'$2'}>{thread.like_count}</Text>
                            </XStack>
                            <XStack ai={'center'}>
                                <Ionicons
                                    name={thread.is_disliked ? "thumbs-down" : "thumbs-down-outline"}
                                    onPress={inDetailScreen ? handleDislike : () => null}
                                    size={26}
                                    color="black"
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

            {isSheetVisible && (
                <BottomSheet
                    snapPoints={['25%']}
                    onClose={() => setSheetVisible(false)}
                >
                    <View style={{ padding: 16 }}>
                        <Pressable onPress={handleChat}>
                            <Text style={{ textAlign: 'center', fontSize: 18 }}>Chat</Text>
                        </Pressable>
                    </View>
                </BottomSheet>
            )}
        </>
    );
};