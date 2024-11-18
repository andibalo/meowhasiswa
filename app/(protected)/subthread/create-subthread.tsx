import React, { useState } from "react";
import { Button, Input, Stack, Text, YStack, XStack, ScrollView, Image } from "tamagui";
import { Modal, } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';
import * as ImagePicker from 'expo-image-picker';

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

    const onSelectColor = ({ hex }) => {
        setSelectedColor(hex);
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
        <ScrollView>
            <YStack f={1} padding="$4" bg="$background">
                <Text fontSize="$8" fontWeight="bold" color="$color" mb="$5">
                    Create your own Submeow
                </Text>
                <Stack gap="$2">
                    <Text fontSize="$3" color="$color" mb="$1">
                        Input Submeow Title
                    </Text>
                    <Input
                        placeholder="Enter Title"
                        value={title}
                        onChangeText={setTitle}
                        bg="$backgroundSoft"
                        padding="$3"
                        borderRadius="$2"
                    />
                    <Text fontSize="$3" color="$color" mt="$3" >
                        Input Submeow Description
                    </Text>
                    <Input
                        placeholder="Enter Description"
                        value={description}
                        onChangeText={setDescription}
                        bg="$backgroundSoft"
                        height={90}
                        padding="$2"
                        borderRadius="$2"
                        verticalAlign="top"
                    />
                    <Text fontSize="$3" color="$color" mb="$1">
                        Select Label Color
                    </Text>
                    <Button bg={selectedColor ? selectedColor : "$backgroundSoft"} padding="$1" borderRadius="$3" onPress={() => setShowmodal(true)}>
                        <Text fontSize="$2"> {selectedColor} </Text>
                    </Button>
                    <Modal visible={showmodal} animationType='slide'>
                        <XStack jc="center">
                        <ColorPicker style={{ width: '70%' }} value='red' onComplete={onSelectColor}>
                            <Preview />
                            <Panel1 />
                            <HueSlider />
                            <OpacitySlider />
                            <Swatches />
                        </ColorPicker>
                        </XStack>
                        <Button onPress={() => setShowmodal(false)} >
                            <Text fontSize="$3"> Select Color </Text>
                        </Button>
                    </Modal>
                    <Text fontSize="$3" color="$color" mb="$1">
                        Select Submeow Profile
                    </Text>
                    <Button onPress={pickImage}>
                        <Text> Pick an image from camera roll </Text>
                    </Button>
                    {image && <Image source={{ uri: image }} width={200} height={200} />}

                    <Button
                        onPress={handleSubthread}
                        bg="$backgroundSoft"
                        padding="$3"
                        borderRadius="$3"
                        ai="center"
                        jc="center"
                    >
                        <Text fontSize="$4" fontWeight="bold" color="$color">
                            Submit
                        </Text>
                    </Button>
                </Stack>
            </YStack>
        </ScrollView>
    );
}
