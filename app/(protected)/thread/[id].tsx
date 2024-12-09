import { Separator, View, Text, YStack, XStack, ScrollView } from "tamagui";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  useDislikeCommentMutation,
  useFetchThreadByIdQuery,
  useFetchThreadCommentsQuery,
  useLikeCommentMutation,
  usePostCommentMutation,
  useReplyCommentMutation,
  useUnSubscribeThreadMutation,
  useSubscribeThreadMutation
} from "redux/api/thread";
import { CommentInput, CommentItem, ThreadItem } from "components/home";
import { BottomSheet, Error, Loading, NotFound } from "components/common";
import { useState, useRef, useCallback } from "react";
import { useToast } from "hooks";
import { IComment, ICommentReply } from "types/model";
import { Pressable, Alert } from "react-native";
import {
  useDeleteCommentMutation,
  useDeleteReplyCommentMutation,
} from "redux/api/thread";
import { useEditCommentMutation, useEditCommentReplyMutation, useFetchUserProfileQuery } from "redux/api";
import {
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { Ellipsis } from "@tamagui/lucide-icons";

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

  const [subscribeThread] = useSubscribeThreadMutation();
  const [unSubscribeThread] = useUnSubscribeThreadMutation();

  const [postComment] = usePostCommentMutation();
  const [editComment] = useEditCommentMutation()
  const [editCommentReply] = useEditCommentReplyMutation()
  const [likeComment] = useLikeCommentMutation();
  const [dislikeComment] = useDislikeCommentMutation();
  const [replyComment] = useReplyCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [deleteReplyComment] = useDeleteReplyCommentMutation();

  const [comment, setComment] = useState("");
  const [selectedComment, setSelectedComment] = useState<
    IComment | ICommentReply | null
  >(null);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [replyCommentData, setReplyCommentData] = useState<IComment | null>(
    null
  );

  const commentBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const threadBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const toast = useToast();

  const threadComments = threadCommentsData?.data?.thread_comments;
  const threadDetail = data?.data?.thread;

  const openCommentBottomSheet = useCallback(
    (comment: IComment | ICommentReply) => {
      setSelectedComment(comment);
      commentBottomSheetModalRef.current?.present();
    },
    []
  );

  const closeCommentBottomSheet = useCallback(() => {
    commentBottomSheetModalRef.current?.dismiss();
  }, []);

  const openThreadBottomSheet = useCallback(() => {
    threadBottomSheetModalRef.current?.present();
  }, []);

  const closeThreadBottomSheet = useCallback(() => {
    threadBottomSheetModalRef.current?.dismiss();
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

  if (!userProfile) {
    return <NotFound description="User Not Found" />;
  }

  if (userProfileError) {
    return <Error />;
  }

  const onEditClose = () => {
    setIsEditing(false);
    setSelectedComment(null);
    setComment("");
  };

  const onReplyClose = () => {
    setIsReplying(false);
    setReplyCommentData(null);
    setComment("");
  };

  const onEditCommentPress = () => {
    if (!selectedComment) {
      return
    }

    setIsEditing(true);
    setComment(selectedComment.content);
    closeCommentBottomSheet()
  };

  const onReplyPress = (commentData: IComment) => {
    setIsReplying(true);
    setReplyCommentData(commentData);
    setComment(`**@${commentData.username}** `);
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
      if (isEditing) {
        if (!selectedComment) {
          toast.showToastError("No Comment Selected");
          return
        }

        if ("thread_comment_id" in selectedComment) {
          await editCommentReply({
            threadId: id,
            content: comment,
            commentId: selectedComment.id,
          }).unwrap();

          onEditClose()
          return
        }

        await editComment({
          threadId: id,
          content: comment,
          commentId: selectedComment.id,
        }).unwrap();

        onEditClose()
        return
      }

      if (isReplying) {
        if (!replyCommentData) {
          return;
        }

        await replyComment({
          threadId: id,
          content: comment,
          commentId: replyCommentData.id,
        }).unwrap();

        onReplyClose()
        return;
      }

      await postComment({ threadId: id, content: comment }).unwrap();
      setComment("");
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 200);
    } catch (error) {
      toast.showToastError("Error submitting comment", error);
    }
  };

  const handleDeleteComment = async (comment: IComment | ICommentReply) => {
    if (comment.user_id !== userProfile?.id) {
      toast.showToastError("You can only delete your own comments.");
      return;
    }

    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this comment? This action cannot be undone.",
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

              closeCommentBottomSheet()
            } catch (error) {
              toast.showToastError("Could not delete comment", error)
              closeCommentBottomSheet()
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleSubscribeThread = async () => {
    Alert.alert(
      "Receive notifications for this thread?",
      "You will receive notifications if there are any new comments on this thread.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Subscribe",
          style: "default",
          onPress: async () => {
            try {
              await subscribeThread(threadDetail.id);
              closeThreadBottomSheet()
            } catch (error) {
              toast.showToastError("Error Subscribe Thread", error);
              closeThreadBottomSheet()
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleUnsubscribeThread = async () => {
    Alert.alert(
      "Turn off notifications for this thread?",
      "You will not receive any notifications if there are new comments on this thread.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Unsubscribe",
          style: "default",
          onPress: async () => {
            try {
              await unSubscribeThread(threadDetail.id);
              closeThreadBottomSheet()
            } catch (error) {
              toast.showToastError("Error Unsubscribe Thread", error);
              closeThreadBottomSheet()
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View flex={1} backgroundColor="$background">
      <ScrollView ref={scrollViewRef}>
        <ThreadItem thread={threadDetail} inDetailScreen openBottomSheet={openThreadBottomSheet} />
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
                        onPress={() => openCommentBottomSheet(comment)}
                      >
                        <View p="$2">
                          <Ellipsis size="$1" />
                        </View>
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
                                openCommentBottomSheet(commentReply)
                              }
                            >
                              <View p="$2">
                                <Ellipsis size="$1" />
                              </View>
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
        isEditing={isEditing}
        onReplyClose={onReplyClose}
        onEditClose={onEditClose}
        replyMention={replyCommentData && replyCommentData.username}
      />
      <BottomSheet
        ref={commentBottomSheetModalRef}
      >
        <YStack gap="$4" padding="$3">
          {selectedComment?.user_id === userProfile.id && (
            <Pressable
              onPress={() => onEditCommentPress()}
            >
              <Text>Edit Comment</Text>
            </Pressable>
          )}
          <Pressable
            onPress={() => null}
          >
            <Text>Report</Text>
          </Pressable>
          {selectedComment?.user_id === userProfile.id && (
            <Pressable
              onPress={() =>
                selectedComment && handleDeleteComment(selectedComment)
              }
            >
              <Text color="$red10">Delete Comment</Text>
            </Pressable>
          )}
        </YStack>
      </BottomSheet>
      <BottomSheet
        ref={threadBottomSheetModalRef}
      >
        <YStack gap="$4" padding="$3">
          {userProfile.id !== threadDetail.user_id &&
            (
              <Pressable onPress={threadDetail.is_subscribed ? handleUnsubscribeThread : handleSubscribeThread}>
                <Text color="$primary">{threadDetail.is_subscribed ? "Unsubscribe" : "Subscribe"}</Text>
              </Pressable>
            )}
          <Pressable onPress={handleSubscribeThread}>
            <Text color="$primary">Report</Text>
          </Pressable>
        </YStack>
      </BottomSheet>
    </View>
  );
}
