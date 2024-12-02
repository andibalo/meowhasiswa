import { Button, Input, Stack, Text, YStack, XStack, Image } from "tamagui";
import { FontAwesome } from "@expo/vector-icons";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "redux/store";
import { register } from "redux/slice/auth";
import { useRouter } from "expo-router";

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
};

const registerSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup.string().required("Password is required"),
});

export default function Register() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const handleRegister = async (formData: RegisterFormData) => {
    try {
       await dispatch(register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
       })
      ).unwrap();

      // @ts-ignore
      router.push({
        pathname: "/verify-email",
        params: { email: formData.email },
      });
    } catch (error) {
      console.log(error, "REGISTER FORM");
    }
  };

  return (
    <YStack f={1} jc="center" ai="center" padding="$4" bg="$background">
      <YStack mb="$1" ai="center">
        <Image
          source={require("../assets/images/meow-logo.png")}
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
          Username
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Enter your username"
              value={value}
              onChangeText={onChange}
              bg="$backgroundSoft"
              padding="$3"
              borderRadius="$2"
              autoCapitalize="none"
            />
          )}
          name="username"
        />
        {errors.username && (
          <Text color="$red10" fontSize={12}>
            {errors.username.message}
          </Text>
        )}
        <Text fontSize="$3" color="$color" mt="$3">
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
              keyboardType="email-address"
              textContentType="emailAddress"
              padding="$3"
              borderRadius="$2"
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text color="$red10" fontSize={12}>
            {errors.password.message}
          </Text>
        )}
      </Stack>
      <XStack mt="$3" ai="center">
        <Text fontSize="$3" color="$color">
          Already have an account?
        </Text>
        <Text
          fontWeight="bold"
          onPress={() => {
            //@ts-ignore
            router.push("/login");
          }}
          style={{ textDecorationLine: "underline" }}
          ml="$2"
        >
          Login
        </Text>
      </XStack>
      <XStack width="80%" jc="flex-end" mt="$5">
        <Button
          onPress={handleSubmit(handleRegister)}
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
    </YStack>
  );
}
