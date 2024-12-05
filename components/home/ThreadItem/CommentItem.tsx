import { useState, useRef, useCallback } from "react";
import { Reply } from "@tamagui/lucide-icons";
import { Text, View, XStack, YStack, Avatar } from "tamagui";
import { IComment, ICommentReply } from "types/model/thread";
import { Pressable } from "react-native";
import { formateDateWithDaysAgoThreshold } from "utils";
import { Ionicons } from "@expo/vector-icons";
import Markdown from "react-native-markdown-display";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

interface CommentItemProps {
  comment: IComment | ICommentReply;
  isReply?: boolean;
  onLikePress: () => void;
  onDislikePress: () => void;
  onReplyPress?: () => void;
}

export const CommentItem = ({
  comment,
  isReply = false,
  onDislikePress,
  onLikePress,
  onReplyPress,
}: CommentItemProps) => {
  // BottomSheetModal state management
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleDismissModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View mb={"$3"} bg={"$white1"} borderRadius={"$radius.4"}>
          <YStack flex={1} justifyContent="space-between" gap="$3">
            <View>
              <XStack mb="$3" jc={"space-between"}>
                <View>
                  <XStack alignItems="center">
                    <View mr={"$2"}>
                      <Avatar
                        borderRadius={"$2"}
                        borderWidth="$1"
                        borderColor="$primary"
                        size="$4"
                      >
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
                        <Text color="$primary" fontWeight="bold">
                          {comment.university_abbreviated_name}
                        </Text>
                        <Text color="$secondary">{comment.username}</Text>
                      </XStack>
                      <XStack gap="$2" alignItems="center">
                        <Text color="$primary" fontSize="$3">
                          {formateDateWithDaysAgoThreshold(
                            comment.created_at,
                            3
                          )}
                        </Text>
                      </XStack>
                    </YStack>
                  </XStack>
                </View>
                <Pressable onPress={handlePresentModalPress}>
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={24}
                    color="$primary"
                  />
                </Pressable>
              </XStack>
              <View>
                <Markdown>{comment.content}</Markdown>
              </View>
            </View>
            <XStack gap={"$5"}>
              <XStack ai={"center"}>
                <Ionicons
                  name={comment.is_liked ? "paw" : "paw-outline"}
                  onPress={onLikePress}
                  size={26}
                  color="black"
                />
                <Text ml={"$2"}>{comment.like_count}</Text>
              </XStack>
              <XStack ai={"center"}>
                <Ionicons
                  name={
                    comment.is_disliked ? "thumbs-down" : "thumbs-down-outline"
                  }
                  onPress={onDislikePress}
                  size={26}
                  color="black"
                />
                <Text ml={"$2"}>{comment.dislike_count}</Text>
              </XStack>
              {!isReply && (
                <Pressable onPress={onReplyPress}>
                  <XStack ai={"center"}>
                    <Reply />
                    <Text ml={"$2"}>Reply</Text>
                  </XStack>
                </Pressable>
              )}
            </XStack>
          </YStack>
        </View>

        {/* Bottom Sheet Modal */}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={["90%"]} // Adjust as needed
          onDismiss={handleDismissModal}
        >
          <BottomSheetView>
            <XStack justifyContent="space-between" padding="$3">
              {/* Delete Comment button without functionality */}
              <Pressable>
                <Text color="$error">Delete Comment</Text>
              </Pressable>
              <Pressable onPress={handleDismissModal}>
                <Text color="$primary">Cancel</Text>
              </Pressable>
            </XStack>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView> // Close GestureHandlerRootView here
  );
};
