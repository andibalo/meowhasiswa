import { Button, Input, Stack, Text, YStack, XStack, Image } from "tamagui";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from "hooks";
import { useResetPasswordMutation } from "redux/api";

type ResetPasswordFormData = {
  newPassword: string
  confirmNewPassword: string
}

const resetPasswordSchema = yup.object().shape({
  newPassword: yup.
    string().
    required('Field is required'),
  confirmNewPassword: yup.
    string().
    required('Field is required')
});

export default function SetNewPasswordScreen() {
  const router = useRouter();
  const toast = useToast()
  const { email } = useLocalSearchParams<{ email: string }>();
  const [resetPassword] = useResetPasswordMutation()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const handleResetPassword = async (formData: ResetPasswordFormData) => {

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.showToastError("Password does not match")
      return
    }

    try {
      await resetPassword({
        email,
        password: formData.newPassword
      })

      router.push("/forgot-password/complete")
    } catch (error) {
      toast.showToastError("Could not reset password", error)
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
        Set New Password
      </Text>
      <Stack gap="$2" width="80%">
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
              placeholder="Enter your new password"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              bg="$backgroundSoft"
              padding="$3"
              borderRadius="$2"
              autoCapitalize="none"
            />
          )}
          name="newPassword"
        />
        {errors.newPassword && (
          <Text color="$red10" fontSize={12}>
            {errors.newPassword.message}
          </Text>
        )}
      </Stack>
      <Stack gap="$2" width="80%">
        <Text fontSize="$3" color="$color" mt="$3">
          Confirm Password
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Confirm your new password"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              bg="$backgroundSoft"
              padding="$3"
              borderRadius="$2"
              autoCapitalize="none"
            />
          )}
          name="confirmNewPassword"
        />
        {errors.confirmNewPassword && (
          <Text color="$red10" fontSize={12}>
            {errors.confirmNewPassword.message}
          </Text>
        )}
      </Stack>
      <XStack width="80%" jc="center" mt="$5">
        <Button
          onPress={handleSubmit(handleResetPassword)}
          bg="$primary"
          padding="$3"
          borderRadius="$3"
          width="100%"
          height={45}
          ai="center"
          jc="center"
        >
          <Text color="#fff" fontWeight="bold" fontSize="$3">
            Reset Password
          </Text>
        </Button>
      </XStack>
    </YStack>
  );
}
