import { Separator, View, Text, YStack, ScrollView } from "tamagui";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useDislikeCommentMutation, useFetchThreadByIdQuery, useFetchThreadCommentsQuery, useLikeCommentMutation, usePostCommentMutation, useReplyCommentMutation } from "redux/api/thread";
import { CommentInput, CommentItem, ThreadItem } from "components/home";
import { Error, Loading, NotFound } from "components/common";
import { useState, useRef } from "react";
import { useToast } from "hooks";
import { IComment } from "types/model";

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
    const [replyComment] = useReplyCommentMutation();
    const [comment, setComment] = useState("");
    const [isReplying, setIsReplying] = useState(false)
    const [replyCommentData, setReplyCommentData] = useState<IComment | null>(null)
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

    const onReplyClose = () => {
        setIsReplying(false)
        setReplyCommentData(null)
        setComment("")
    }

    const onReplyPress = (commentData: IComment) => {
        setIsReplying(true)
        setReplyCommentData(commentData)
        setComment(`**@${commentData.username}** `)
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

    const handleSubmitComment = async () => {
        if (comment.trim() === "") return;

        try {
            if (isReplying) {
                if (!replyCommentData) {
                    return
                }

                await replyComment({ threadId: id, content: comment, commentId: replyCommentData.id }).unwrap();
                setComment("");
                setIsReplying(false)
                setReplyCommentData(null)
                return
            }

            await postComment({ threadId: id, content: comment }).unwrap();
            setComment("");
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 200);

        } catch (error) {
            toast.showToastError("Error submitting comment:", error);
        }
    }

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
                                            onReplyPress={() => onReplyPress(comment)}
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
            <CommentInput
                comment={comment}
                onChangeText={(val) => setComment(val)}
                onSubmit={handleSubmitComment}
                isReplying={isReplying}
                onReplyClose={onReplyClose}
                replyMention={replyCommentData && replyCommentData.username}
            />
        </View>
    );
}