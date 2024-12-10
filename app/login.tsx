import { Button, Input, Stack, Text, YStack, XStack, Image } from "tamagui";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "redux/slice/auth";
import { useAppDispatch } from "redux/store";
import * as SecureStore from "expo-secure-store";
import { JWT_TOKEN_KEY } from "constants/common";

type LoginFormData = {
  email: string;
  password: string;
};

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup.string().required("Password is required"),
});

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (formData: LoginFormData) => {
    //TODO: add error handling and success/fail toast
    try {
      const res = await dispatch(
        login({
          email: formData.email,
          password: formData.password,
        })
      ).unwrap();

      if (!res?.data) {
        throw new Error("unable to login");
      }

      await SecureStore.setItemAsync(JWT_TOKEN_KEY, res.data);

      // @ts-ignore
      navigation.navigate("(tabs)");
    } catch (error) {
      console.log(error, "LOGIN FORM");
    }
  };

  return (
    <YStack f={1} jc="center" ai="center" padding="$4" bg="$background">
      <YStack mb="$1" ai="center">
        <Image
          source={
            {
              uri: 'https://meowhasiswa-59cc5f49-f82b-4998-af05-368c90f07a20.s3.ap-southeast-1.amazonaws.com/meow-logo.png',
              width: 260,
              height: 260,
            }
          }
          width={260}
          height={260}
          objectFit="contain"
        />
      </YStack>
      <Text fontSize="$9" fontWeight="bold" color="$color" mb="$5">
        MeowHasiswa
      </Text>
      <Stack gap="$2" width="80%">
        <Text fontSize="$3" color="$color" mb="$1">
          Email
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Enter your email"
              value={value}
              keyboardType="email-address"
              textContentType="emailAddress"
              onChangeText={onChange}
              bg="$backgroundSoft"
              padding="$3"
              borderRadius="$2"
              autoCapitalize="none"
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text color="$red10" fontSize={12}>
            {errors.email.message}
          </Text>
        )}
        <Text fontSize="$3" color="$color" mt="$3">
          Password
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Enter your password"
              value={value}
              onChangeText={onChange}
              secureTextEntry
              bg="$backgroundSoft"
              padding="$3"
              borderRadius="$2"
              autoCapitalize="none"
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text color="$red10" fontSize={12}>
            {errors.password.message}
          </Text>
        )}
        <XStack jc="flex-end" mt="$2" width="100%">
          <Text
            fontSize="$2"
            color="$secondary"
            style={{ textDecorationLine: "underline" }}
            onPress={() => {
              // @ts-ignore
              navigation.navigate("forgot-password/input-email");
            }}
          >
            Forgot Password?
          </Text>
        </XStack>
      </Stack>
      <XStack width="80%" jc="flex-end" mt="$5">
        <Button
          onPress={handleSubmit(handleLogin)}
          bg="$primary"
          padding="$3"
          borderRadius="$3"
          width={48}
          height={48}
          ai="center"
          jc="center"
        >
          <FontAwesome name="arrow-right" size={20} color="#fff" />
        </Button>
      </XStack>
      <XStack mt="$7" ai="center">
        <Text fontSize="$3" color="$color">
          Don't have an account?
        </Text>
        <Text
          fontWeight="bold"
          onPress={() => {
            // @ts-ignore
            navigation.navigate("register");
          }}
          style={{ textDecorationLine: "underline" }}
          ml="$2"
        >
          Register
        </Text>
      </XStack>
    </YStack>
  );
}
