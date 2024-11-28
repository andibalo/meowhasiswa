import { Separator, View, Text, YStack, ScrollView, Input, XStack, Button } from "tamagui";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useDislikeCommentMutation, useFetchThreadByIdQuery, useFetchThreadCommentsQuery, useLikeCommentMutation, usePostCommentMutation } from "redux/api/thread";
import { CommentItem, ThreadItem } from "components/home";
import { Error, Loading, NotFound } from "components/common";
import { Send } from "@tamagui/lucide-icons";
import { useState, useRef } from "react";
import { useToast } from "hooks";

export default function ThreadDetailScreen() {
    const navigation = useNavigation();
    const { id } = useLocalSearchParams<{ id: string }>();

    if (!id) {
        navigation.goBack();
        return;
    }

    const { data, error, isLoading } = useFetchThreadByIdQuery(id);
    const { data: threadCommentsData, error: errorFetchThreadComments, isLoading: isFetchingThreadComments } = useFetchThreadCommentsQuery(id)
    const [postComment] = usePostCommentMutation();
    const [likeComment] = useLikeCommentMutation();
    const [dislikeComment] = useDislikeCommentMutation();
    const [comment, setComment] = useState("");
    const scrollViewRef = useRef<ScrollView>(null);
    const toast = useToast()

    const threadComments = threadCommentsData?.data?.thread_comments
    const threadDetail = data?.data?.thread


    if (isLoading || isFetchingThreadComments) {
        return <Loading />;
    }

    if (error || errorFetchThreadComments) {
        return <Error />;
    }

    if (!threadDetail) {
        return <NotFound description="Thread Not Found" />
    }

    const onLikePress = async ({ threadId, isReply, commentId }) => {
        try {
            await likeComment({ threadId, isReply, commentId }).unwrap();
        } catch (error) {
            toast.showToastError("Could not like comment", error)
        }
    }

    const onDislikePress = async ({ threadId, isReply, commentId }) => {
        try {
            await dislikeComment({ threadId, isReply, commentId }).unwrap();
        } catch (error) {
            toast.showToastError("Could not dislike comment", error)
        }
    }

    const handlePostComment = async () => {
        if (comment.trim() === "") return;

        try {
            await postComment({ threadId: id, content: comment }).unwrap();
            setComment("");
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 200);
        } catch (err) {
            console.error("Error posting comment:", err);
        }
    };

    return (

        <View flex={1} backgroundColor="$background">
            <ScrollView ref={scrollViewRef}>
                <ThreadItem thread={threadDetail} inDetailScreen />
                <View>
                    <Separator mb="$2" />
                </View>
                <View px="$5" py="$2">
                    <Text fontSize="$7" fontWeight="bold" mb="$3">Comments</Text>
                    {
                        threadComments && threadComments.length > 0 &&
                        <YStack gap="$4">
                            {
                                threadComments.map((comment) => (
                                    <View key={comment.id} >
                                        <CommentItem
                                            comment={comment}
                                            onLikePress={() => onLikePress({
                                                threadId: comment.thread_id,
                                                isReply: false,
                                                commentId: comment.id
                                            })}
                                            onDislikePress={() => onDislikePress({
                                                threadId: comment.thread_id,
                                                isReply: false,
                                                commentId: comment.id
                                            })}
                                        />
                                        <YStack pl="$5" mt='$2' gap="$2">
                                            {
                                                comment.replies.length > 0 && comment.replies.map((commentReply) => (
                                                    <CommentItem
                                                        key={commentReply.id}
                                                        isReply={true}
                                                        comment={commentReply}
                                                        onLikePress={() => onLikePress({
                                                            threadId: commentReply.thread_id,
                                                            isReply: true,
                                                            commentId: commentReply.id
                                                        })}
                                                        onDislikePress={() => onDislikePress({
                                                            threadId: commentReply.thread_id,
                                                            isReply: true,
                                                            commentId: commentReply.id
                                                        })}
                                                    />
                                                ))
                                            }
                                        </YStack>
                                    </View>
                                ))
                            }
                        </YStack>
                    }
                    <View height={50} />
                </View>
            </ScrollView>
            <XStack
                borderTopWidth={1}
                borderTopColor="$primary"
                position="absolute"
                height={50}
                bottom={0}
                left={0}
                right={0}
                bg="$background"
                alignItems="center"
                px="$2"
                gap="$1"
            >
                <Input
                    flex={1}
                    placeholder="Write a comment..."
                    value={comment}
                    onChangeText={setComment}
                />
                <Button
                    size="$3"
                    chromeless
                    icon={<Send color="$primary" size="$1.5" />}
                    onPress={handlePostComment}
                />
            </XStack>
        </View>
    );
}