import { Text,Input,TextArea,Button,YStack,View,Select,ScrollView, } from "tamagui";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChevronDown } from "@tamagui/lucide-icons";
import { useState } from "react";

type RateUniversityFormData = {
  title: string;
  content: string;
  universityMajor: string;
  facilityRating: string;
  studentOrganizationRating: string;
  socialEnvironmentRating: string;
  educationQualityRating: string;
  priceToValueRating: string;
  pros: string[];
  cons: string[];
};

const rateUniversitySchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
  universityMajor: yup.string().required("Select a university major"),
  facilityRating: yup.string().required("Select a facility rating"),
  studentOrganizationRating: yup.string().required("Select a student organization rating"),
  socialEnvironmentRating: yup.string().required("Select a social environment rating"),
  educationQualityRating: yup.string().required("Select a education quality rating"),
  priceToValueRating: yup.string().required("Select a price to value rating"),
  pros: yup
    .array()
    .of(yup.string())
    .required("Please provide at least 1 pro")
    .test(
      "at-least-one-pro",
      "Please provide at least 1 pro",
      (value) => Array.isArray(value) && value.some((v) => v?.trim() !== "")
    ),
  cons: yup
    .array()
    .of(yup.string())
    .required("Please provide at least 1 con")
    .test(
      "at-least-one-con",
      "Please provide at least 1 con",
      (value) => Array.isArray(value) && value.some((v) => v?.trim() !== "")
    ),
});

export default function RateUniversityScreen() {
  const navigation = useNavigation();
  const [isMajorDropdownVisible, setIsMajorDropdownVisible] = useState(false);
  const [isFRatingDropdownVisible, setIsFRatingDropdownVisible] = useState(false);
  const [isSoRatingDropdownVisible, setIsSoRatingDropdownVisible] = useState(false);
  const [isSeRatingDropdownVisible, setIsSeRatingDropdownVisible] = useState(false);
  const [isEqRatingDropdownVisible, setIsEqRatingDropdownVisible] = useState(false);
  const [isPtvRatingDropdownVisible, setIsPtvRatingDropdownVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RateUniversityFormData>({
    resolver: yupResolver(rateUniversitySchema),
    defaultValues: {
      title: "",
      content: "",
      universityMajor: "",
      facilityRating: "",
      studentOrganizationRating: "",
      socialEnvironmentRating: "",
      educationQualityRating: "",
      priceToValueRating: "",
      pros: ["", "", ""],
      cons: ["", "", ""],
    },
  });

  const handleRateUniversity = async (formData: RateUniversityFormData) => {
    console.log("Form Data:", formData);
    navigation.goBack(); 
  };

  const toggleMajorDropdown = () => setIsMajorDropdownVisible((prev) => !prev);
  const toggleFRatingDropdown = () =>
    setIsFRatingDropdownVisible((prev) => !prev);
  const toggleSoRatingDropdown = () =>
    setIsSoRatingDropdownVisible((prev) => !prev);
  const toggleSeRatingDropdown = () =>
    setIsSeRatingDropdownVisible((prev) => !prev);
  const toggleEqRatingDropdown = () =>
    setIsEqRatingDropdownVisible((prev) => !prev);
  const togglePtvRatingDropdown = () =>
    setIsPtvRatingDropdownVisible((prev) => !prev);

  const closeMajorDropdown = (value: string) => {
    setIsMajorDropdownVisible(false);
    setValue("universityMajor", value);
  };
  const closeFRatingDropdown = (value: string) => {
    setIsFRatingDropdownVisible(false);
    setValue("facilityRating", value);
  };
  const closeSoRatingDropdown = (value: string) => {
    setIsSoRatingDropdownVisible(false);
    setValue("studentOrganizationRating", value);
  };
  const closeSeRatingDropdown = (value: string) => {
    setIsSeRatingDropdownVisible(false);
    setValue("socialEnvironmentRating", value);
  };
  const closeEqRatingDropdown = (value: string) => {
    setIsEqRatingDropdownVisible(false);
    setValue("educationQualityRating", value);
  };
  const closePtvRatingDropdown = (value: string) => {
    setIsPtvRatingDropdownVisible(false);
    setValue("priceToValueRating", value);
  };

  return (
    <ScrollView flex={1} backgroundColor="$backgroundSoft">
      <YStack gap="$3" flex={1} backgroundColor="$backgroundSoft" padding="$3">
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
          {errors.title && (
            <Text color="$red10" fontSize={12}>
              {errors.title.message}
            </Text>
          )}
        </View>
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
          {errors.content && (
            <Text color="$red10" fontSize={12}>
              {errors.content.message}
            </Text>
          )}
        </View>
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
                  <Select
                    value={value}
                    onValueChange={(selectedValue) =>
                      closeMajorDropdown(selectedValue)
                    }
                  >
                    <Select.Item value="Engineering">Engineering</Select.Item>
                    <Select.Item value="Business">Business</Select.Item>
                    <Select.Item value="Arts">Arts</Select.Item>
                    <Select.Item value="Sciences">Sciences</Select.Item>
                  </Select>
                )}
              </>
            )}
          />
          {errors.universityMajor && (
            <Text color="$red10" fontSize={12}>
              {errors.universityMajor.message}
            </Text>
          )}
        </View>
        <View>
          <Text color="$color" fontWeight="bold" mb="$2">
            Facility Rating
          </Text>
          <Controller
            control={control}
            name="facilityRating"
            render={({ field: { onChange, value } }) => (
              <>
                <TouchableOpacity onPress={toggleFRatingDropdown}>
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
                {isFRatingDropdownVisible && (
                  <Select
                    value={value}
                    onValueChange={(selectedValue) =>
                      closeFRatingDropdown(selectedValue)
                    }
                  >
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
          {errors.facilityRating && (
            <Text color="$red10" fontSize={12}>
              {errors.facilityRating.message}
            </Text>
          )}
        </View>
        <View>
          <Text color="$color" fontWeight="bold" mb="$2">
            Student Organization Rating
          </Text>
          <Controller
            control={control}
            name="studentOrganizationRating"
            render={({ field: { onChange, value } }) => (
              <>
                <TouchableOpacity onPress={toggleSoRatingDropdown}>
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
                {isSoRatingDropdownVisible && (
                  <Select
                    value={value}
                    onValueChange={(selectedValue) =>
                      closeSoRatingDropdown(selectedValue)
                    }
                  >
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
          {errors.studentOrganizationRating && (
            <Text color="$red10" fontSize={12}>
              {errors.studentOrganizationRating.message}
            </Text>
          )}
        </View>
        <View>
          <Text color="$color" fontWeight="bold" mb="$2">
            Social Environment Rating
          </Text>
          <Controller
            control={control}
            name="socialEnvironmentRating"
            render={({ field: { onChange, value } }) => (
              <>
                <TouchableOpacity onPress={toggleSeRatingDropdown}>
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
                {isSeRatingDropdownVisible && (
                  <Select
                    value={value}
                    onValueChange={(selectedValue) =>
                      closeSeRatingDropdown(selectedValue)
                    }
                  >
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
          {errors.socialEnvironmentRating && (
            <Text color="$red10" fontSize={12}>
              {errors.socialEnvironmentRating.message}
            </Text>
          )}
        </View>
        <View>
          <Text color="$color" fontWeight="bold" mb="$2">
            Education Quality Rating
          </Text>
          <Controller
            control={control}
            name="educationQualityRating"
            render={({ field: { onChange, value } }) => (
              <>
                <TouchableOpacity onPress={toggleEqRatingDropdown}>
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
                {isEqRatingDropdownVisible && (
                  <Select
                    value={value}
                    onValueChange={(selectedValue) =>
                      closeEqRatingDropdown(selectedValue)
                    }
                  >
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
          {errors.educationQualityRating && (
            <Text color="$red10" fontSize={12}>
              {errors.educationQualityRating.message}
            </Text>
          )}
        </View>
        <View>
          <Text color="$color" fontWeight="bold" mb="$2">
            Price To Value Rating
          </Text>
          <Controller
            control={control}
            name="priceToValueRating"
            render={({ field: { onChange, value } }) => (
              <>
                <TouchableOpacity onPress={togglePtvRatingDropdown}>
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
                {isPtvRatingDropdownVisible && (
                  <Select
                    value={value}
                    onValueChange={(selectedValue) =>
                      closePtvRatingDropdown(selectedValue)
                    }
                  >
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
          {errors.priceToValueRating && (
            <Text color="$red10" fontSize={12}>
              {errors.priceToValueRating.message}
            </Text>
          )}
        </View>
        <View>
          <Text color="$color" fontWeight="bold" mb="$2">
            Pros
          </Text>
          {[0, 1, 2].map((index) => (
            <View key={index}>
              <Controller
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
              {errors.pros?.[index]?.message && (
                <Text color="$red10" fontSize={12}>
                  {errors.pros[index].message}
                </Text>
              )}
            </View>
          ))}
          {errors.pros?.message && (
            <Text color="$red10" fontSize={12}>
              {errors.pros.message}
            </Text>
          )}
        </View>
        <View>
          <Text color="$color" fontWeight="bold" mb="$2">
            Cons
          </Text>
          {[0, 1, 2].map((index) => (
            <View key={index}>
              <Controller
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
              {errors.cons?.[index]?.message && (
                <Text color="$red10" fontSize={12}>
                  {errors.cons[index].message}
                </Text>
              )}
            </View>
          ))}
          {errors.cons?.message && (
            <Text color="$red10" fontSize={12}>
              {errors.cons.message}
            </Text>
          )}
        </View>
        <Button
          bg="$primary"
          color="white"
          onPress={handleSubmit(handleRateUniversity)}
        >
          Submit
        </Button>
      </YStack>
    </ScrollView>
  );
}
