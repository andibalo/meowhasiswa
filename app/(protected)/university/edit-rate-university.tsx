import {
    Text,
    Input,
    TextArea,
    Button,
    YStack,
    View,
    Select,
    ScrollView,
  } from "tamagui";
  import { TouchableOpacity } from "react-native";
  import { useNavigation } from "expo-router";
  import * as yup from "yup";
  import { useForm, Controller } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { ChevronDown } from "@tamagui/lucide-icons";
  import { useState } from "react";
  import { useCreateUniversityReviewMutation } from "redux/api";
  import { useFetchUserProfileQuery } from "redux/api";
  import { Error, NotFound } from "components/common";
  
  type RateUniversityFormData = {
    title: string;
    content: string;
    facility_rating: number;
    student_organization_rating: number;
    university_major: string;
    social_environment_rating: number;
    education_quality_rating: number;
    price_to_value_rating: number;
    pros: string[];
    cons: string[];
  };
  
  const rateUniversitySchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    content: yup.string().required("Content is required"),
    university_major: yup.string().required("Select a university major"),
    facility_rating: yup
      .number()
      .required("Select a facility rating")
      .min(1, "Minimum rating is 1")
      .max(5, "Maximum rating is 5"),
    student_organization_rating: yup
      .number()
      .required("Select a student organization rating")
      .min(1, "Minimum rating is 1")
      .max(5, "Maximum rating is 5"),
    social_environment_rating: yup
      .number()
      .required("Select a social environment rating")
      .min(1, "Minimum rating is 1")
      .max(5, "Maximum rating is 5"),
    education_quality_rating: yup
      .number()
      .required("Select an education quality rating")
      .min(1, "Minimum rating is 1")
      .max(5, "Maximum rating is 5"),
    price_to_value_rating: yup
      .number()
      .required("Select a price-to-value rating")
      .min(1, "Minimum rating is 1")
      .max(5, "Maximum rating is 5"),
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
  
  export default function EditRateUniversityScreen() {
    const navigation = useNavigation();
    const { data, error, isLoading } = useFetchUserProfileQuery();
    const [createUniversityReview] = useCreateUniversityReviewMutation();
    const [isMajorDropdownVisible, setIsMajorDropdownVisible] = useState(false);
    const [isFRatingDropdownVisible, setIsFRatingDropdownVisible] =
      useState(false);
    const [isSoRatingDropdownVisible, setIsSoRatingDropdownVisible] =
      useState(false);
    const [isSeRatingDropdownVisible, setIsSeRatingDropdownVisible] =
      useState(false);
    const [isEqRatingDropdownVisible, setIsEqRatingDropdownVisible] =
      useState(false);
    const [isPtvRatingDropdownVisible, setIsPtvRatingDropdownVisible] =
      useState(false);
  
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
        university_major: "",
        facility_rating: 0,
        student_organization_rating: 0,
        social_environment_rating: 0,
        education_quality_rating: 0,
        price_to_value_rating: 0,
        pros: ["", "", ""],
        cons: ["", "", ""],
      },
    });
  
    if (error) {
      return <Error />;
    }
  
    const userProfile = data?.data;
  
    if (!userProfile) {
      return <NotFound description="User Not Found" />;
    }
  
    const handleRateUniversity = async (formData: RateUniversityFormData) => {
      try {
        await createUniversityReview({
          university_id: userProfile.university_id!,
          ...formData,
        }).unwrap();

        navigation.goBack();
      } catch (err) {
        console.error("Error creating review:", err);
      }
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
      setValue("university_major", value);
    };
    const closeFRatingDropdown = (value: string) => {
      setIsFRatingDropdownVisible(false);
      setValue("facility_rating", Number(value));
    };
    const closeSoRatingDropdown = (value: string) => {
      setIsSoRatingDropdownVisible(false);
      setValue("student_organization_rating", Number(value));
    };
    const closeSeRatingDropdown = (value: string) => {
      setIsSeRatingDropdownVisible(false);
      setValue("social_environment_rating", Number(value));
    };
    const closeEqRatingDropdown = (value: string) => {
      setIsEqRatingDropdownVisible(false);
      setValue("education_quality_rating", Number(value));
    };
    const closePtvRatingDropdown = (value: string) => {
      setIsPtvRatingDropdownVisible(false);
      setValue("price_to_value_rating", Number(value));
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
              name="university_major"
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
                      <Select.Item value="Informatika" index={1}>
                        Informatika
                      </Select.Item>
                      <Select.Item value="DKV" index={2}>
                        DKV
                      </Select.Item>
                      <Select.Item value="Ilmu Komunikasi" index={3}>
                        Ilmu Komunikasi 
                      </Select.Item>
                      <Select.Item value="Jurnalistik" index={4}>
                        Jurnalistik
                      </Select.Item>
                    </Select>
                  )}
                </>
              )}
            />
            {errors.university_major && (
              <Text color="$red10" fontSize={12}>
                {errors.university_major.message}
              </Text>
            )}
          </View>
          <View>
            <Text color="$color" fontWeight="bold" mb="$2">
              Facility Rating
            </Text>
            <Controller
              control={control}
              name="facility_rating"
              render={({ field: { onChange, value } }) => (
                <>
                  <TouchableOpacity onPress={toggleFRatingDropdown}>
                    <Input
                      value={String(value)}
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
                      value={String(value)}
                      onValueChange={(selectedValue) =>
                        closeFRatingDropdown(selectedValue)
                      }
                    >
                      <Select.Item value="1" index={1}>
                        1
                      </Select.Item>
                      <Select.Item value="2" index={2}>
                        2
                      </Select.Item>
                      <Select.Item value="3" index={3}>
                        3
                      </Select.Item>
                      <Select.Item value="4" index={4}>
                        4
                      </Select.Item>
                      <Select.Item value="5" index={5}>
                        5
                      </Select.Item>
                    </Select>
                  )}
                </>
              )}
            />
            {errors.facility_rating && (
              <Text color="$red10" fontSize={12}>
                {errors.facility_rating.message}
              </Text>
            )}
          </View>
          <View>
            <Text color="$color" fontWeight="bold" mb="$2">
              Student Organization Rating
            </Text>
            <Controller
              control={control}
              name="student_organization_rating"
              render={({ field: { onChange, value } }) => (
                <>
                  <TouchableOpacity onPress={toggleSoRatingDropdown}>
                    <Input
                      value={String(value)}
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
                      value={String(value)}
                      onValueChange={(selectedValue) =>
                        closeSoRatingDropdown(selectedValue)
                      }
                    >
                      <Select.Item value="1" index={1}>
                        1
                      </Select.Item>
                      <Select.Item value="2" index={2}>
                        2
                      </Select.Item>
                      <Select.Item value="3" index={3}>
                        3
                      </Select.Item>
                      <Select.Item value="4" index={4}>
                        4
                      </Select.Item>
                      <Select.Item value="5" index={5}>
                        5
                      </Select.Item>
                    </Select>
                  )}
                </>
              )}
            />
            {errors.student_organization_rating && (
              <Text color="$red10" fontSize={12}>
                {errors.student_organization_rating.message}
              </Text>
            )}
          </View>
          <View>
            <Text color="$color" fontWeight="bold" mb="$2">
              Social Environment Rating
            </Text>
            <Controller
              control={control}
              name="social_environment_rating"
              render={({ field: { onChange, value } }) => (
                <>
                  <TouchableOpacity onPress={toggleSeRatingDropdown}>
                    <Input
                      value={String(value)}
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
                      value={String(value)}
                      onValueChange={(selectedValue) =>
                        closeSeRatingDropdown(selectedValue)
                      }
                    >
                      <Select.Item value="1" index={1}>
                        1
                      </Select.Item>
                      <Select.Item value="2" index={2}>
                        2
                      </Select.Item>
                      <Select.Item value="3" index={3}>
                        3
                      </Select.Item>
                      <Select.Item value="4" index={4}>
                        4
                      </Select.Item>
                      <Select.Item value="5" index={5}>
                        5
                      </Select.Item>
                    </Select>
                  )}
                </>
              )}
            />
            {errors.social_environment_rating && (
              <Text color="$red10" fontSize={12}>
                {errors.social_environment_rating.message}
              </Text>
            )}
          </View>
          <View>
            <Text color="$color" fontWeight="bold" mb="$2">
              Education Quality Rating
            </Text>
            <Controller
              control={control}
              name="education_quality_rating"
              render={({ field: { onChange, value } }) => (
                <>
                  <TouchableOpacity onPress={toggleEqRatingDropdown}>
                    <Input
                      value={String(value)}
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
                      value={String(value)}
                      onValueChange={(selectedValue) =>
                        closeEqRatingDropdown(selectedValue)
                      }
                    >
                      <Select.Item value="1" index={1}>
                        1
                      </Select.Item>
                      <Select.Item value="2" index={2}>
                        2
                      </Select.Item>
                      <Select.Item value="3" index={3}>
                        3
                      </Select.Item>
                      <Select.Item value="4" index={4}>
                        4
                      </Select.Item>
                      <Select.Item value="5" index={5}>
                        5
                      </Select.Item>
                    </Select>
                  )}
                </>
              )}
            />
            {errors.education_quality_rating && (
              <Text color="$red10" fontSize={12}>
                {errors.education_quality_rating.message}
              </Text>
            )}
          </View>
          <View>
            <Text color="$color" fontWeight="bold" mb="$2">
              Price To Value Rating
            </Text>
            <Controller
              control={control}
              name="price_to_value_rating"
              render={({ field: { onChange, value } }) => (
                <>
                  <TouchableOpacity onPress={togglePtvRatingDropdown}>
                    <Input
                      value={String(value)}
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
                      value={String(value)}
                      onValueChange={(selectedValue) =>
                        closePtvRatingDropdown(selectedValue)
                      }
                    >
                      <Select.Item value="1" index={1}>
                        1
                      </Select.Item>
                      <Select.Item value="2" index={2}>
                        2
                      </Select.Item>
                      <Select.Item value="3" index={3}>
                        3
                      </Select.Item>
                      <Select.Item value="4" index={4}>
                        4
                      </Select.Item>
                      <Select.Item value="5" index={5}>
                        5
                      </Select.Item>
                    </Select>
                  )}
                </>
              )}
            />
            {errors.price_to_value_rating && (
              <Text color="$red10" fontSize={12}>
                {errors.price_to_value_rating.message}
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
              </View>
            ))}
            {errors.pros && (
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
              </View>
            ))}
            {errors.cons?.[0] && (
              <Text color="$red10" fontSize={12}>
                {errors.cons[0].message}
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
  