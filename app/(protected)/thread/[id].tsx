import { Separator, View, Text, YStack, ScrollView, Input, XStack, Button } from "tamagui";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useFetchThreadByIdQuery, usePostCommentMutation } from "redux/api/thread";
import { CommentItem, ThreadItem } from "components/home";
import { Error, Loading, NotFound } from "components/common";
import { Send } from "@tamagui/lucide-icons";
import { useState, useRef } from "react";

export default function ThreadDetailScreen() {
    const navigation = useNavigation();
    const { id } = useLocalSearchParams<{ id: string }>();

    if (!id) {
        navigation.goBack();
        return;
    }

    const { data, error, isLoading } = useFetchThreadByIdQuery(id);
    const [postComment] = usePostCommentMutation();
    const [comment, setComment] = useState("");
    const scrollViewRef = useRef<ScrollView>(null);

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
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

    // TODO: Enhance UI for view reply comments & integrate with API
    return (
        data?.data?.thread ?
            <View flex={1} backgroundColor="$background">
                <ScrollView ref={scrollViewRef}>
                    <ThreadItem thread={data.data.thread} inDetailScreen />
                    <View>
                        <Separator mb="$2" />
                    </View>
                    <View px="$5" py="$2">
                        <Text fontSize="$7" fontWeight="bold" mb="$3">Comments</Text>
                        {
                            data.data.thread.comments && data.data.thread.comments.length > 0 &&
                            <YStack gap="$5">
                                {
                                    data.data.thread.comments.map((comment) => (
                                        <View key={comment.id} >
                                            <CommentItem comment={comment} />
                                            <YStack pl="$5" mt='$2' gap="$2"> 
                                                <CommentItem canReply={false} key={"25"} comment={comment} />
                                                <CommentItem canReply={false} key={"23"} comment={comment} />
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
            :
            <NotFound description="Thread Not Found" />
    );
}