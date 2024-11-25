import { useState } from "react";
import { Button, Input, Text, YStack, ScrollView, Image, View, TextArea, XStack } from "tamagui";
import { Modal, StyleSheet, } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import ColorPicker, { Panel1, Swatches, OpacitySlider, HueSlider, PreviewText, colorKit } from 'reanimated-color-picker';
import * as ImagePicker from 'expo-image-picker';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import type { returnedResults } from 'reanimated-color-picker';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateSubThreadMutation } from "redux/api";
import { bytesToMegaBytes } from "utils";
import { useToast } from "hooks";
import { uploadImage } from "services/image";

type ICreateSubThreadFormData = {
    title: string
    description: string
    labelColor: string
    imageUrl: string
}

const createSubThreadSchema = yup.object().shape({
    title: yup.
        string().
        required('Title is required'),
    description: yup.
        string().
        required('Description is required'),
    labelColor: yup.
        string().
        required('Label Color is required'),
    imageUrl: yup.
        string().
        required('Image is required'),
});

export default function CreateSubthreadScreen() {
    const navigation = useNavigation();
    const [showmodal, setShowmodal] = useState(false);
    const [selectedColor, setSelectedColor] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const toast = useToast()

    const [createSubThread] = useCreateSubThreadMutation()

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<ICreateSubThreadFormData>({
        resolver: yupResolver(createSubThreadSchema),
        defaultValues: {
            title: '',
            description: '',
            labelColor: '',
            imageUrl: ''
        },
    });

    const handleCreateSubthread = async (formData: ICreateSubThreadFormData) => {
        try {

            await createSubThread({
                name: formData.title,
                description: formData.description,
                image_url: formData.imageUrl,
                label_color: formData.labelColor
            }).unwrap()

            navigation.goBack()

        } catch (error) {
            toast.showToastError("Error Creating Submeow", error)
        }
    };

    const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex());

    const colorPickerValue = useSharedValue(customSwatches[0]);
    const backgroundColorStyle = useAnimatedStyle(() => ({ backgroundColor: colorPickerValue.value }));

    const onColorPickerSelect = (color: returnedResults) => {
        'worklet';
        colorPickerValue.value = color.hex;
    };

    const onSelectColor = () => {
        setSelectedColor(colorPickerValue.value)
        setShowmodal(false)
        setValue("labelColor", colorPickerValue.value)
    };

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [3, 3],
                quality: 1,
            });

            if (!result.canceled) {
                if (result.assets[0].fileSize) {
                    if (bytesToMegaBytes(result.assets[0].fileSize) > 3) {
                        toast.showToastError("File Too Big", "Image size must be less than 3 MB")
                        return
                    }
                }

                const uploadResp = await uploadImage({
                    uri: result.assets[0].uri,
                    fileName: result.assets[0].fileName,
                    type: result.assets[0].mimeType,
                })

                if (!uploadResp?.data?.data?.URL) {
                    toast.showToastError("Image URL not found")
                    return
                }

                setValue("imageUrl", uploadResp.data.data.URL)

                setImage(result.assets[0].uri);
            }
        } catch (error) {
            toast.showToastError("Something Went Wrong", error)
        }
    };

    return (
        <ScrollView flex={1} backgroundColor="$background">
            <View flex={1} padding="$3" >
                <YStack gap="$3">
                    <View>
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
                                    value={value}
                                    onChangeText={onChange}
                                    bg="$backgroundSoft"
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
                            Description
                        </Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextArea
                                    value={value}
                                    onChangeText={onChange}
                                    bg="$backgroundSoft"
                                    borderRadius="$2"
                                    verticalAlign="top"
                                    maxLength={255}
                                />
                            )}
                            name="description"
                        />
                        {errors.description && <Text color="$red10" fontSize={12}>{errors.description.message}</Text>}
                    </View>
                    <View>
                        <Text color="$color" fontWeight="bold" mb="$2">
                            Select Label Color
                        </Text>
                        <Button bg={selectedColor ? selectedColor : "$backgroundSoft"} padding="$1" borderRadius="$3" onPress={() => setShowmodal(true)}>
                            <Text color={"$primary"}>
                                Choose Label Color
                            </Text>
                        </Button>
                        {errors.labelColor && <Text color="$red10" fontSize={12}>{errors.labelColor.message}</Text>}
                    </View>
                    <View>
                        <Modal visible={showmodal} animationType='slide'>
                            <Animated.View style={[styles.container, backgroundColorStyle]}>
                                <View p="$5">
                                    <ColorPicker
                                        value={colorPickerValue.value}
                                        sliderThickness={25}
                                        thumbSize={24}
                                        thumbShape='circle'
                                        onChange={onColorPickerSelect}
                                        boundedThumb
                                    >
                                        <Panel1 style={styles.panelStyle} />
                                        <HueSlider style={styles.sliderStyle} />
                                        <OpacitySlider style={styles.sliderStyle} />
                                        <Swatches style={styles.swatchesContainer} swatchStyle={styles.swatchStyle} />
                                        <View style={styles.previewTxtContainer}>
                                            <PreviewText style={{ color: '#707070' }} />
                                        </View>
                                    </ColorPicker>
                                    <Button bg="$primary" color="white" mt='$3' onPress={() => onSelectColor()}>
                                        Select Color
                                    </Button>
                                </View>
                            </Animated.View>
                        </Modal>
                        <Text color="$color" fontWeight="bold" mb="$2">
                            Select Profile Picture
                        </Text>
                        <Button onPress={pickImage}>
                            <Text> Pick an image from camera roll </Text>
                        </Button>
                        {errors.imageUrl && <Text color="$red10" fontSize={12}>{errors.imageUrl.message}</Text>}
                    </View>
                    <XStack justifyContent="center" >
                        {image && <Image source={{ uri: image }} width={200} height={200} />}
                    </XStack>
                    <Button
                        onPress={handleSubmit(handleCreateSubthread)}
                        bg="$primary"
                        color="white"
                    >
                        Submit
                    </Button>
                </YStack>
            </View >
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    pickerContainer: {
        alignSelf: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    panelStyle: {
        borderRadius: 16,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    sliderStyle: {
        borderRadius: 20,
        marginTop: 20,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    previewTxtContainer: {
        paddingTop: 20,
        marginTop: 20,
        borderTopWidth: 1,
        borderColor: '#bebdbe',
    },
    swatchesContainer: {
        paddingTop: 20,
        marginTop: 20,
        borderTopWidth: 1,
        borderColor: '#bebdbe',
        alignItems: 'center',
        flexWrap: 'nowrap',
        gap: 10,
    },
    swatchStyle: {
        borderRadius: 20,
        height: 30,
        width: 30,
        margin: 0,
        marginBottom: 0,
        marginHorizontal: 0,
        marginVertical: 0,
    },
});