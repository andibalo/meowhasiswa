import { Separator, View, Text, YStack, XStack, ScrollView } from "tamagui";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
    useDislikeCommentMutation,
    useFetchThreadByIdQuery,
    useFetchThreadCommentsQuery,
    useLikeCommentMutation,
    usePostCommentMutation,
    useReplyCommentMutation,
} from "redux/api/thread";
import { CommentInput, CommentItem, ThreadItem } from "components/home";
import { Error, Loading, NotFound } from "components/common";
import { useState, useRef, useCallback } from "react";
import { useToast } from "hooks";
import { IComment, ICommentReply } from "types/model";

import { Pressable, Alert } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
    useDeleteCommentMutation,
    useDeleteReplyCommentMutation,
} from "redux/api/thread";
import { useFetchUserProfileQuery } from "redux/api";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetView,
} from "@gorhom/bottom-sheet";

export default function ThreadDetailScreen() {
    const navigation = useNavigation();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data, error, isLoading } = useFetchThreadByIdQuery(id);
    const { data: userProfileData, error: userProfileError } =
        useFetchUserProfileQuery();
    const {
        data: threadCommentsData,
        error: errorFetchThreadComments,
        isLoading: isFetchingThreadComments,
    } = useFetchThreadCommentsQuery(id);

    const userProfile = userProfileData?.data;

    const [postComment] = usePostCommentMutation();
    const [likeComment] = useLikeCommentMutation();
    const [dislikeComment] = useDislikeCommentMutation();
    const [replyComment] = useReplyCommentMutation();
    const [deleteComment] = useDeleteCommentMutation(); //
    const [deleteReplyComment] = useDeleteReplyCommentMutation(); //
    const [isEditing, setIsEditing] = useState(false);
    const [editingComment, setEditingComment] = useState<IComment | null>(null);

    const [comment, setComment] = useState("");
    const [selectedComment, setSelectedComment] = useState<
        IComment | ICommentReply | null
    >(null); //
    const [isReplying, setIsReplying] = useState(false);
    const [replyCommentData, setReplyCommentData] = useState<IComment | null>(
        null
    );

    const bottomSheetModalRef = useRef<BottomSheetModal>(null); //
    const scrollViewRef = useRef<ScrollView>(null);
    const toast = useToast();

    const threadComments = threadCommentsData?.data?.thread_comments;
    const threadDetail = data?.data?.thread;

    const handlePresentModalPress = useCallback(
        (comment: IComment | ICommentReply) => {
            if (comment.user_id === userProfile?.id) {
                setSelectedComment(comment);
                bottomSheetModalRef.current?.present();
            } else {
                toast.showToastError("You can only manage your own comments.");
            }
        },
        [userProfile?.id, toast]
    );

    const handleDismissModal = useCallback(() => {
        bottomSheetModalRef.current?.dismiss();
    }, []);

    if (!id) {
        navigation.goBack();
        return;
    }

    if (isLoading || isFetchingThreadComments) {
        return <Loading />;
    }

    if (error || errorFetchThreadComments) {
        return <Error />;
    }

    if (!threadDetail) {
        return <NotFound description="Thread Not Found" />;
    }

    if (userProfileError) {
        return <Error />;
    }

    const onReplyClose = () => {
        setIsReplying(false);
        setReplyCommentData(null);
        setComment("");
    };

    const onReplyPress = (commentData: IComment) => {
        setIsReplying(true);
        setReplyCommentData(commentData);
        setComment(`*@${commentData.username}* `);
    };

    const onLikePress = async ({ threadId, isReply, commentId }) => {
        try {
            await likeComment({ threadId, isReply, commentId }).unwrap();
        } catch (error) {
            toast.showToastError("Could not like comment", error);
        }
    };

    const onDislikePress = async ({ threadId, isReply, commentId }) => {
        try {
            await dislikeComment({ threadId, isReply, commentId }).unwrap();
        } catch (error) {
            toast.showToastError("Could not dislike comment", error);
        }
    };

    const handleSubmitComment = async () => {
        if (comment.trim() === "") return;

        try {
            if (isReplying) {
                if (!replyCommentData) {
                    return;
                }

                await replyComment({
                    threadId: id,
                    content: comment,
                    commentId: replyCommentData.id,
                }).unwrap();
                setComment("");
                setIsReplying(false);
                setReplyCommentData(null);
                return;
            }

            await postComment({ threadId: id, content: comment }).unwrap();
            setComment("");
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 200);
        } catch (error) {
            toast.showToastError("Error submitting comment:", error);
        }
    };
    
    const handleEditComment = (comment: IComment | ICommentReply) => {
        if ('replies' in comment) {
            // It's an IComment
            setEditingComment(comment); // Store the comment being edited
            setComment(comment.content); // Pre-fill the input field with the comment content
            setIsEditing(true); // Set the editing state to true
            bottomSheetModalRef.current?.dismiss(); // Close the modal
        } else {
            // It's an ICommentReply
            toast.showToastError("Replies cannot be edited.");
        }
    };


    const handleDeleteComment = async (comment: IComment | ICommentReply) => {
        if (comment.user_id !== userProfile?.id) {
            toast.showToastError("You can only delete your own comments.");
            return;
        }

        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this thread? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            if ("thread_comment_id" in comment) {
                                await deleteReplyComment(comment.id).unwrap();
                            } else {
                                await deleteComment(comment.id).unwrap();
                            }
                            Alert.alert("Success", "Thread deleted successfully.");
                        } catch (error) {
                            Alert.alert("Error", "Failed to delete the thread.");
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <View flex={1} backgroundColor="$background">
                    <ScrollView ref={scrollViewRef}>
                        <ThreadItem thread={threadDetail} inDetailScreen />
                        <View>
                            <Separator mb="$2" />
                        </View>
                        <View px="$5" py="$2">
                            <Text fontSize="$7" fontWeight="bold" mb="$3">
                                Comments
                            </Text>
                            {threadComments && threadComments.length > 0 && (
                                <YStack gap="$4">
                                    {threadComments.map((comment) => (
                                        <View key={comment.id}>
                                            <XStack
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <CommentItem
                                                    comment={comment}
                                                    onLikePress={() =>
                                                        onLikePress({
                                                            threadId: comment.thread_id,
                                                            isReply: false,
                                                            commentId: comment.id,
                                                        })
                                                    }
                                                    onDislikePress={() =>
                                                        onDislikePress({
                                                            threadId: comment.thread_id,
                                                            isReply: false,
                                                            commentId: comment.id,
                                                        })
                                                    }
                                                    onReplyPress={() => onReplyPress(comment)}
                                                />
                                                <YStack mb="$14">
                                                    <Pressable
                                                        onPress={() => handlePresentModalPress(comment)}
                                                    >
                                                        <MaterialCommunityIcons
                                                            name="dots-vertical"
                                                            size={24}
                                                            color="$primary"
                                                        />
                                                    </Pressable>
                                                </YStack>
                                            </XStack>
                                            <YStack pl="$5" mt="$2" gap="$2">
                                                {comment.replies.length > 0 &&
                                                    comment.replies.map((commentReply) => (
                                                        <XStack
                                                            justifyContent="space-between"
                                                            alignItems="center"
                                                        >
                                                            <CommentItem
                                                                key={commentReply.id}
                                                                isReply={true}
                                                                comment={commentReply}
                                                                onLikePress={() =>
                                                                    onLikePress({
                                                                        threadId: commentReply.thread_id,
                                                                        isReply: true,
                                                                        commentId: commentReply.id,
                                                                    })
                                                                }
                                                                onDislikePress={() =>
                                                                    onDislikePress({
                                                                        threadId: commentReply.thread_id,
                                                                        isReply: true,
                                                                        commentId: commentReply.id,
                                                                    })
                                                                }
                                                            />
                                                            <YStack mb="$14">
                                                                <Pressable
                                                                    onPress={() =>
                                                                        handlePresentModalPress(commentReply)
                                                                    }
                                                                >
                                                                    <MaterialCommunityIcons
                                                                        name="dots-vertical"
                                                                        size={24}
                                                                        color="$primary"
                                                                    />
                                                                </Pressable>
                                                            </YStack>
                                                        </XStack>
                                                    ))}
                                            </YStack>
                                        </View>
                                    ))}
                                </YStack>
                            )}
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
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={["90%"]}
                    onDismiss={handleDismissModal}
                >
                    <BottomSheetView>
                        <XStack justifyContent="space-between" padding="$3">
                            {selectedComment?.user_id === userProfile?.id ? (
                                 <View gap='$2'>
                                    <Pressable
                                         onPress={() =>
                                            selectedComment && handleEditComment(selectedComment)
                                         }
                                     >
                                         <Text color="$primary">Edit Comment</Text>
                                    </Pressable>
                                 <Pressable
                                     onPress={() =>
                                         selectedComment && handleDeleteComment(selectedComment)
                                     }
                                 >
                                     <Text color="$error">Delete Comment</Text>
                                 </Pressable>
                                 </View>
                            ) : (
                                <Text color="$gray">You can't delete this comment</Text>
                            )}
                            <Pressable onPress={handleDismissModal}>
                                <Text color="$primary">Cancel</Text>
                            </Pressable>
                        </XStack>
                    </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}