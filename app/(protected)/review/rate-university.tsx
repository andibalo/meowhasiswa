import { Text, Input, TextArea, Button, YStack, View, Select, ScrollView } from 'tamagui';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronDown } from '@tamagui/lucide-icons';
import { useState } from 'react';

type RateUniversityFormData = {
  title: string;
  content: string;
  universityMajor: string;
  facilityRating: string;
  pros: string[];
  cons: string[];
};

const rateUniversitySchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required'),
  universityMajor: yup.string().required('Select a university major'),
  facilityRating: yup.string().required('Select a facility rating'),
  pros: yup
    .array()
    .of(yup.string().required('All pros are required'))
    .min(1, 'Please provide at least 1 pro'), // Require at least 1 pro
  cons: yup
    .array()
    .of(yup.string().required('All cons are required'))
    .min(1, 'Please provide at least 1 con'), // Require at least 1 con
});

export default function RateUniversityScreen() {
  const navigation = useNavigation();
  const [isMajorDropdownVisible, setIsMajorDropdownVisible] = useState(false);
  const [isRatingDropdownVisible, setIsRatingDropdownVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RateUniversityFormData>({
    resolver: yupResolver(rateUniversitySchema),
    defaultValues: {
      title: '',
      content: '',
      universityMajor: '',
      facilityRating: '',
      pros: ['', '', ''],
      cons: ['', '', ''],
    },
  });

  const handleRateUniversity = async (formData: RateUniversityFormData) => {
    console.log('Form Data:', formData);
    navigation.goBack(); // Simulating form submission
  };

  const toggleMajorDropdown = () => setIsMajorDropdownVisible((prev) => !prev);
  const toggleRatingDropdown = () => setIsRatingDropdownVisible((prev) => !prev);

  const closeMajorDropdown = (value: string) => {
    setIsMajorDropdownVisible(false);
    setValue('universityMajor', value);
  };

  const closeRatingDropdown = (value: string) => {
    setIsRatingDropdownVisible(false);
    setValue('facilityRating', value);
  };

  return (
    <ScrollView flex={1} backgroundColor="$backgroundSoft">
      <YStack gap="$3" flex={1} backgroundColor="$backgroundSoft" padding="$3">
        {/* Title */}
        <View>
          <Text color="$color" fontWeight="bold" mb="$2">
            Title
          </Text>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <Input value={value} onChangeText={onChange} borderRadius="$2" />
            )}
          />
          {errors.title && <Text color="$red10" fontSize={12}>{errors.title.message}</Text>}
        </View>

        {/* Content */}
        <View>
          <Text color="$color" fontWeight="bold" mb="$2">
            Content
          </Text>
          <Controller
            control={control}
            name="content"
            render={({ field: { onChange, value } }) => (
              <TextArea
                value={value}
                onChangeText={onChange}
                borderRadius="$2"
                maxLength={255}
                verticalAlign="top"
              />
            )}
          />
          {errors.content && <Text color="$red10" fontSize={12}>{errors.content.message}</Text>}
        </View>

        {/* University Major (Dropdown) */}
        <View>
          <Text color="$color" fontWeight="bold" mb="$2">
            University Major
          </Text>
          <Controller
            control={control}
            name="universityMajor"
            render={({ field: { onChange, value } }) => (
              <>
                <TouchableOpacity onPress={toggleMajorDropdown}>
                  <Input
                    value={value}
                    editable={false}
                    pointerEvents="none"
                    borderRadius="$2"
                    placeholder="Select major"
                  />
                  <Button
                    position="absolute"
                    right={0}
                    disabled
                    chromeless
                    padding="$3"
                    icon={<ChevronDown color="$primary" size="$1.5" />}
                  />
                </TouchableOpacity>
                {isMajorDropdownVisible && (
                  <Select value={value} onValueChange={(selectedValue) => closeMajorDropdown(selectedValue)}>
                    <Select.Item value="Engineering">Engineering</Select.Item>
                    <Select.Item value="Business">Business</Select.Item>
                    <Select.Item value="Arts">Arts</Select.Item>
                    <Select.Item value="Sciences">Sciences</Select.Item>
                  </Select>
                )}
              </>
            )}
          />
          {errors.universityMajor && <Text color="$red10" fontSize={12}>{errors.universityMajor.message}</Text>}
        </View>

        {/* Facility Rating (Dropdown) */}
        <View>
          <Text color="$color" fontWeight="bold" mb="$2">
            Facility Rating
          </Text>
          <Controller
            control={control}
            name="facilityRating"
            render={({ field: { onChange, value } }) => (
              <>
                <TouchableOpacity onPress={toggleRatingDropdown}>
                  <Input
                    value={value}
                    editable={false}
                    pointerEvents="none"
                    borderRadius="$2"
                    placeholder="Select rating"
                  />
                  <Button
                    position="absolute"
                    right={0}
                    disabled
                    chromeless
                    padding="$3"
                    icon={<ChevronDown color="$primary" size="$1.5" />}
                  />
                </TouchableOpacity>
                {isRatingDropdownVisible && (
                  <Select value={value} onValueChange={(selectedValue) => closeRatingDropdown(selectedValue)}>
                    <Select.Item value="1">1</Select.Item>
                    <Select.Item value="2">2</Select.Item>
                    <Select.Item value="3">3</Select.Item>
                    <Select.Item value="4">4</Select.Item>
                    <Select.Item value="5">5</Select.Item>
                  </Select>
                )}
              </>
            )}
          />
          {errors.facilityRating && <Text color="$red10" fontSize={12}>{errors.facilityRating.message}</Text>}
        </View>

        {/* Pros */}
        <View>
          <Text color="$color" fontWeight="bold" mb="$2">
            Pros
          </Text>
          {[0, 1, 2].map((index) => (
            <Controller
              key={index}
              control={control}
              name={`pros.${index}`}
              render={({ field: { onChange, value } }) => (
                <TextArea
                  value={value}
                  onChangeText={onChange}
                  borderRadius="$2"
                  maxLength={255}
                  verticalAlign="top"
                />
              )}
            />
          ))}
          {errors.pros && <Text color="$red10" fontSize={12}>{errors.pros.message}</Text>}
        </View>

        {/* Cons */}
        <View>
          <Text color="$color" fontWeight="bold" mb="$2">
            Cons
          </Text>
          {[0, 1, 2].map((index) => (
            <Controller
              key={index}
              control={control}
              name={`cons.${index}`}
              render={({ field: { onChange, value } }) => (
                <TextArea
                  value={value}
                  onChangeText={onChange}
                  borderRadius="$2"
                  maxLength={255}
                  verticalAlign="top"
                />
              )}
            />
          ))}
          {errors.cons && <Text color="$red10" fontSize={12}>{errors.cons.message}</Text>}
        </View>

        {/* Submit Button */}
        <Button bg="$primary" color="white" onPress={handleSubmit(handleRateUniversity)}>
          Submit
        </Button>
      </YStack>
    </ScrollView>
  );
}
