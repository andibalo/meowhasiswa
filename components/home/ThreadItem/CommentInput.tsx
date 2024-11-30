import { Input, XStack, Button, View, Text } from "tamagui";
import { Send, X } from "@tamagui/lucide-icons";
import { Pressable } from "react-native";


interface ICommentInputProps {
    comment: string
    onChangeText: (val: string) => void
    onSubmit: () => void
    replyMention?: string | null
    isReplying?: boolean
    onReplyClose?: () => void
}

export const CommentInput = ({
    onChangeText,
    comment,
    onSubmit,
    replyMention = "",
    isReplying = false,
    onReplyClose
}: ICommentInputProps) => {

    return (
        <View position="absolute" bottom={0} left={0} right={0}>
            {
                isReplying &&
                <XStack
                    p="$3"
                    bg="$background"
                    justifyContent="space-between"
                    alignItems="center"
                    borderTopWidth={1}
                    borderTopColor="$primary"
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
                borderTopColor="$primary"
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