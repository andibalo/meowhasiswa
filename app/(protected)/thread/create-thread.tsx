import { Text, Input, TextArea, Button, YStack, View, Avatar, XStack } from 'tamagui';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ChevronDown } from '@tamagui/lucide-icons';
import { Pressable } from 'react-native';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateThreadMutation } from 'redux/api/thread';

type CreateThreadFormData = {
    title: string
    content: string
    summary: string
}

const createThreadSchema = yup.object().shape({
    title: yup.
        string().
        required('Title is required'),
    content: yup.
        string().
        required('Content is required'),
    summary: yup.
        string().
        required('Summary is required'),
});

export default function CreateThreadScreen() {

    const navigation = useNavigation();
    const { id: subthreadID, name: subthreadName, imageUrl: subthreadImageUrl, followersCount: subthreadFollowersCount } = useLocalSearchParams<{
        id: string,
        name: string,
        imageUrl: string,
        followersCount: string
    }>();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateThreadFormData>({
        resolver: yupResolver(createThreadSchema),
        defaultValues: {
            title: '',
            content: '',
            summary: ''
        },
    });

    const [createThread, results] = useCreateThreadMutation()

    const handleCreateThread = async (formData: CreateThreadFormData) => {
        if (subthreadID) {
            await createThread({
                subthread_id: subthreadID,
                title: formData.title,
                content: formData.content,
                content_summary: formData.summary
            }).unwrap()

            navigation.goBack()
        }
    }

    return (
        <YStack gap="$3" flex={1} backgroundColor="$background" padding={'$3'}>
            <View>
                <Text color="$color" fontWeight="bold" mb="$2">
                    Submeow
                </Text>
                <Pressable onPress={() => {
                    //@ts-ignore
                    navigation.navigate("thread/select-subthread")
                }}>
                    {
                        subthreadID === undefined ?
                            <Input readOnly placeholder="Choose Submeow" />
                            :
                            <XStack alignItems="center">
                                <Avatar
                                    borderRadius={"$2"}
                                    borderWidth="$1"
                                    borderColor="$primary"
                                    marginRight="$2"
                                    size="$4"
                                >
                                    <Avatar.Image
                                        accessibilityLabel="Cam"
                                        src={subthreadImageUrl}
                                        objectFit="contain"
                                    />
                                    <Avatar.Fallback backgroundColor="$secondary" />
                                </Avatar>
                                <View>
                                    <Text fontWeight="bold">m/{subthreadName}</Text>
                                    <Text>{subthreadFollowersCount} followers</Text>
                                </View>
                            </XStack>
                    }
                    <Button position="absolute" right={0} disabled chromeless padding="$3" icon={<ChevronDown color="$primary" size="$1.5" />} />
                </Pressable>
            </View>
            <View >
                <Text color="$color" fontWeight="bold" mb="$2">
                    Title
                </Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            disabled={subthreadID === undefined}
                            disabledStyle={{
                                backgroundColor: "$gray7"
                            }}
                            value={value}
                            onChangeText={onChange}
                            borderRadius="$2"
                            maxLength={100}
                        />
                    )}
                    name="title"
                />
                {errors.title && <Text color="$red10" fontSize={12}>{errors.title.message}</Text>}
            </View>
            <View>
                <Text color="$color" fontWeight="bold" mb="$2">
                    Content
                </Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextArea
                            disabled={subthreadID === undefined}
                            disabledStyle={{
                                backgroundColor: "$gray7"
                            }}
                            verticalAlign="top"
                            value={value}
                            onChangeText={onChange}
                            borderRadius="$2"
                            maxLength={255}
                        />
                    )}
                    name="content"
                />
                {errors.content && <Text color="$red10" fontSize={12}>{errors.content.message}</Text>}
            </View>
            <View>
                <Text color="$color" fontWeight="bold" mb="$2">
                    Summary
                </Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextArea
                            disabled={subthreadID === undefined}
                            disabledStyle={{
                                backgroundColor: "$gray7"
                            }}
                            verticalAlign="top"
                            value={value}
                            onChangeText={onChange}
                            borderRadius="$2"
                            maxLength={100}
                        />
                    )}
                    name="summary"
                />
                {errors.summary && <Text color="$red10" fontSize={12}>{errors.summary.message}</Text>}
            </View>
            <Button bg="$primary" color="white" onPress={handleSubmit(handleCreateThread)}>Submit</Button>
        </YStack>
    );
}