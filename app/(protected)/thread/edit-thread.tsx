import React, { useEffect } from 'react';
import { Text, Input, TextArea, Button, YStack, View, Avatar, XStack } from 'tamagui';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFetchThreadByIdQuery, useUpdateThreadMutation } from 'redux/api/thread';
import { useFetchSubThreadListQuery } from 'redux/api/subthread';
import { useToast } from 'hooks'
import { Error, Loading, NotFound, SearchBar, TopTabBar } from 'components/common';

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
    const { id: threadID } = useLocalSearchParams<{ id: string }>();
    const { data: threadResponse, isLoading, error } = useFetchThreadByIdQuery(threadID);
    const userLimit = undefined;
    const { data: subData, isLoading: isLoadingSub, error: errorSub } = useFetchSubThreadListQuery({
        cursor: '',
        limit: userLimit,
        _q: '',
        isFollowing: true,
        includeUniversitySubthread: true,
        shouldExcludeFollowing: false,
    });

    const subthreadID = threadResponse?.data?.thread?.subthread_id;

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

    const handleEditThread = async (formData: EditThreadFormData) => {
        
        if (!subthreadID) {
            toast.showToastWarn("No subthread ID available.")
            return;
        }

        try {
            await updateThread({
                threadId: threadID || "",
                updatedData: {
                    subthread_id: subthreadID,
                    title: formData.title,
                    content: formData.content,
                    content_summary: formData.summary,
                },
            }).unwrap();

            navigation.goBack();
        } catch (err) {
            console.error("Error updating thread:", err);
        }
    };

    if (isLoading || isLoadingSub) {
        return <Loading />;
    }

    if (error || errorSub) {
        return <Error />;
    }

    const subthread = subData?.data?.subthreads.find(
        (sub) => sub.id === subthreadID
    );

    if (!subthread) return <Text>No matching subthread found</Text>;

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
                                src={subthread.image_url}
                                objectFit="contain"
                            />
                            <Avatar.Fallback backgroundColor="$secondary" />
                        </Avatar>
                        <View>
                            <Text fontWeight="bold">m/{subthread.name}</Text>
                            <Text>123 followers</Text>
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