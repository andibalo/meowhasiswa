import { MessageSquare, ThumbsDown, ThumbsUp } from '@tamagui/lucide-icons';
import { Text, View, XStack, YStack, Avatar } from 'tamagui';

interface ThreadItemProps {
    post: any;
}

export const ThreadItem = (props: ThreadItemProps) => {
    return (
        <View mb={'$3'} p={'$3'} bg={'$white'} borderRadius={'$4'}>
            {/* Header Section */}
            <XStack alignItems="center" mb={'$3'}>
                <Avatar size="$5" mr={'$2'}>
                    <Avatar.Image
                        accessibilityLabel="User Avatar"
                        src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                    />
                    <Avatar.Fallback backgroundColor="$blue10" />
                </Avatar>
                <YStack>
                    <Text fontWeight="bold" fontSize={'$4'}>UMN</Text>
                    <XStack gap="$2">
                        <Text fontSize={'$2'} color="#C5C5C5">username12</Text>
                        <Text fontSize={'$2'} color="#030303">6 jam yang lalu</Text>
                        <Text fontSize={'$2'} color="$blue10" backgroundColor="$blue2" borderRadius={'$2'} px={'$1'}>
                            m/Public
                        </Text>
                    </XStack>
                </YStack>
            </XStack>

            {/* Title and Content */}
            <YStack mb={'$3'}>
                <Text fontWeight="bold" fontSize={20} mb={'$2'} color="#030303">
                    This is a title
                </Text>
                <Text color="#030303" lineHeight={22}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit.
                </Text>
            </YStack>

            {/* Divider */}
            <View height={1} backgroundColor="#030303" mb={'$3'} />

            {/* TLDR Section */}
            <YStack mb={'$3'}>
                <Text color="#030303" mb={'$1'}>
                    TLDR
                </Text>
                <Text color="#030303" lineHeight={22}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
            </YStack>

            {/* Reactions Section */}
            <XStack justifyContent="flex-start" pt={'$3'}>
                <XStack alignItems="center" mr={'$5'}>
                    <ThumbsUp color="#030303" />
                    <Text ml={'$1'} color="#030303">24</Text>
                </XStack>
                <XStack alignItems="center" mr={'$5'}>
                    <ThumbsDown color="#030303" />
                    <Text ml={'$1'} color="#030303">2</Text>
                </XStack>
                <XStack alignItems="center" mr={'$5'}>
                    <MessageSquare color="#030303" />
                    <Text ml={'$1'} color="#030303">13</Text>
                </XStack>
            </XStack>
            <View height={2} backgroundColor="#030303" marginBottom={'$3'} marginTop={'$3'} opacity={1} />
        </View>
    );
};