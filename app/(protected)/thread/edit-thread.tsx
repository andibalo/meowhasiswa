import { useEffect } from 'react';
import { Text, Input, TextArea, Button, YStack, View, Avatar, XStack } from 'tamagui';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFetchThreadByIdQuery, useUpdateThreadMutation } from 'redux/api/thread';
import { useFetchSubThreadByIdQuery } from 'redux/api/subthread';
import { useToast } from 'hooks'
import { Error, Loading, NotFound } from 'components/common';

type EditThreadFormData = {
    title: string;
    content: string;
    summary: string;
};

const editThreadSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    content: yup.string().required('Content is required'),
    summary: yup.string().required('Summary is required'),
});

export default function EditThreadScreen() {
    const navigation = useNavigation();
    const toast = useToast()
    const { id: threadID, subThreadId } = useLocalSearchParams<{ id: string, subThreadId: string }>();
    const { data: threadResponse, isLoading, error } = useFetchThreadByIdQuery(threadID);

    const {
        data: subThreadResponse,
        isLoading: isFetchSubThreadByIDLoading,
        error: fetchSubthreadByIDError
    } = useFetchSubThreadByIdQuery(subThreadId);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<EditThreadFormData>({
        resolver: yupResolver(editThreadSchema),
        defaultValues: {
            title: '',
            content: '',
            summary: '',
        },
    });

    const [updateThread] = useUpdateThreadMutation();

    useEffect(() => {
        if (threadResponse?.data?.thread) {
            setValue('title', threadResponse.data.thread.title);
            setValue('content', threadResponse.data.thread.content);
            setValue('summary', threadResponse.data.thread.content_summary);
        }
    }, [threadResponse, setValue]);

    if (isLoading || isFetchSubThreadByIDLoading) {
        return <Loading />;
    }

    if (error || fetchSubthreadByIDError) {
        return <Error />;
    }

    if (!threadResponse?.data?.thread) {
        return <NotFound description='Thread Not Found' />
    }

    if (!subThreadResponse?.data?.subthread) {
        return <NotFound description='SubThread Not Found' />
    }

    const subThread = subThreadResponse.data.subthread

    const handleEditThread = async (formData: EditThreadFormData) => {

        try {
            await updateThread({
                threadId: threadID,
                updatedData: {
                    title: formData.title,
                    content: formData.content,
                    content_summary: formData.summary,
                },
            }).unwrap();

            navigation.goBack();
        } catch (err) {
            toast.showToastError("Error Updating Thread", err)
        }
    };

    return (
        <YStack gap="$3" flex={1} backgroundColor="$backgroundSoft" padding={'$3'}>
            <View>
                <Text color="$color" fontWeight="bold" mb="$2">
                    Submeow
                </Text>
                <View>
                    <XStack alignItems="center" gap="$2">
                        <Avatar
                            borderRadius="$2"
                            borderWidth="$1"
                            borderColor="$primary"
                            marginRight="$2"
                            size="$4"
                        >
                            <Avatar.Image
                                accessibilityLabel="Subthread Avatar"
                                src={subThread.image_url}
                                objectFit="contain"
                            />
                            <Avatar.Fallback backgroundColor="$secondary" />
                        </Avatar>
                        <View>
                            <Text fontWeight="bold">m/{subThread.name}</Text>
                            <Text>{subThread.followers_count} followers</Text>
                        </View>
                    </XStack>
                </View>
            </View>

            <View>
                <Text color="$color" fontWeight="bold" mb="$2">
                    Title
                </Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Input
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
                    render={({ field: { onChange, value } }) => (
                        <TextArea
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
                    render={({ field: { onChange, value } }) => (
                        <TextArea
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

            <Button bg="$primary" color="white" onPress={handleSubmit(handleEditThread)}>
                Update
            </Button>
        </YStack>
    );
}