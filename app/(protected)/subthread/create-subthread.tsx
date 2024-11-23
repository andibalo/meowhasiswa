import { useState } from "react";
import { Button, Input, Text, YStack, ScrollView, Image, View, TextArea } from "tamagui";
import { Modal, StyleSheet, } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import ColorPicker, { Panel1, Swatches, OpacitySlider, HueSlider, PreviewText, colorKit } from 'reanimated-color-picker';
import * as ImagePicker from 'expo-image-picker';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import type { returnedResults } from 'reanimated-color-picker';

export default function CreateSubthreadScreen() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigation = useNavigation();
    const [showmodal, setShowmodal] = useState(false);
    const [selectedColor, setSelectedColor] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const handleSubthread = () => {
        console.log("Title:", title, "Description:", description, "label_color:", selectedColor, "image_url", image);
        navigation.goBack();
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
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
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
                        <Input
                            value={title}
                            onChangeText={setTitle}
                            bg="$backgroundSoft"
                            borderRadius="$2"
                        />
                    </View>
                    <View>
                        <Text color="$color" fontWeight="bold" mb="$2">
                            Description
                        </Text>
                        <TextArea
                            value={description}
                            onChangeText={setDescription}
                            bg="$backgroundSoft"
                            borderRadius="$2"
                            verticalAlign="top"
                            maxLength={255}
                        />
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
                    </View>

                    {image && <Image source={{ uri: image }} width={200} height={200} />}
                    <Button
                        onPress={handleSubthread}
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