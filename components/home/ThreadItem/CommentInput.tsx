import { Input, XStack, Button, View, Text } from "tamagui";
import { Edit3, Send, X } from "@tamagui/lucide-icons";
import { Pressable } from "react-native";

interface ICommentInputProps {
    comment: string
    onChangeText: (val: string) => void
    onSubmit: () => void
    replyMention?: string | null
    isReplying?: boolean
    isEditing?: boolean
    onReplyClose?: () => void
    onEditClose: () => void
}

export const CommentInput = ({
    onChangeText,
    comment,
    onSubmit,
    replyMention = "",
    isReplying = false,
    isEditing = false,
    onReplyClose,
    onEditClose
}: ICommentInputProps) => {
    return (
        <View position="absolute" bottom={0} left={0} right={0}>
            {
                isEditing &&
                <XStack
                    p="$3"
                    bg="$accentTint"
                    justifyContent="space-between"
                    alignItems="center"
                    borderTopWidth={1}
                    borderTopColor="$secondary"
                >
                    <XStack alignItems="center">
                        <Text>Editing Comment</Text>
                        <Edit3 ml="$3" size="$1" />
                    </XStack>
                    <Pressable onPress={onEditClose}>
                        <View p="$1">
                            <X size="$1" />
                        </View>
                    </Pressable>
                </XStack>
            }
            {
                isReplying &&
                <XStack
                    p="$3"
                    bg="$accentTint"
                    justifyContent="space-between"
                    alignItems="center"
                    borderTopWidth={1}
                    borderTopColor="$secondary"
                >
                    <Text>Replying To "{replyMention}"</Text>
                    <Pressable onPress={onReplyClose}>
                        <View p="$1">
                            <X size="$1" />
                        </View>
                    </Pressable>
                </XStack>
            }
            <XStack
                borderTopWidth={1}
                borderTopColor="$secondary"
                bg="$background"
                alignItems="center"
                p="$2"
                gap="$1"
            >

                <Input
                    flex={1}
                    placeholder="Write a comment..."
                    value={comment}
                    onChangeText={onChangeText}
                    onSubmitEditing={onSubmit}
                />
                <Button
                    size="$3"
                    chromeless
                    icon={<Send color="$primary" size="$1.5" />}
                    onPress={onSubmit}
                />
            </XStack>
        </View>

    )
}