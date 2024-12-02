import { Button, Text, View, XStack, YStack, Avatar } from "tamagui";
import { ISubThread } from "types/model/subthread";
import { useFollowSubThreadMutation } from "redux/api";
import { useFetchUserProfileQuery } from "redux/api";
import { useUnFollowSubThreadMutation } from "redux/api";
import { NotFound } from "components/common";
import { useToast } from "hooks";

interface SubThreadItemProps {
  subthread: ISubThread;
  isFollowing?: boolean;
}

export const SubThreadItem = (props: SubThreadItemProps) => {
  const [followSubThread] = useFollowSubThreadMutation();
  const [unFollowSubThread] = useUnFollowSubThreadMutation();
  const subthread = props.subthread;
  const { data } = useFetchUserProfileQuery();

  const userProfile = data?.data;

  const toast = useToast();

  if (!userProfile) {
    return <NotFound description="User Not Found" />;
  }

  const handleFollowSubThread = async () => {
    try {
      await followSubThread({
        subthread_id: subthread.id,
        user_id: userProfile.id,
      }).unwrap();
    } catch (error) {
      toast.showToastError("Error Following Submeow", error);
    }
  };

  const handleUnfollowSubThread = async () => {
    try {
      await unFollowSubThread({
        subthread_id: subthread.id,
        user_id: userProfile.id,
      }).unwrap();
    } catch (error) {
      toast.showToastError("Error unFollowing Submeow", error);
    }
  };

  return (
    <View
      mb={"$3"}
      p={"$2"}
      bg={"$white1"}
      borderRadius={"$radius.4"}
      minHeight={120}
    >
      <XStack p={"$3"} jc={"space-between"}>
        <XStack flex={1} alignItems="center">
          <View mr={"$2"}>
            <Avatar
              borderRadius={"$2"}
              borderWidth="$1"
              borderColor="$primary"
              size="$4"
            >
              <Avatar.Image
                accessibilityLabel="Cam"
                src={subthread.image_url}
                objectFit="contain"
              />
              <Avatar.Fallback backgroundColor="$secondary" />
            </Avatar>
          </View>
          <View flex={1}>
            <XStack flex={1} justifyContent="space-between" alignItems="center">
              <View>
                <Text color="$primary" fontWeight="bold">
                  m/{subthread.name}
                </Text>
                <Text color="$secondary" fontSize="$3">
                  {subthread.followers_count} Followers
                </Text>
              </View>
              {props.isFollowing ? (
                <Button
                  bg="$primary"
                  padding="$1"
                  borderRadius="$3"
                  width={100}
                  height={24}
                  onPress={()=>handleUnfollowSubThread()}
                >
                  <Text color="white" fontSize="$2">
                    Followed
                  </Text>
                </Button>
              ) : (
                <Button
                  bg="$backgroundSoft"
                  padding="$1"
                  borderRadius="$3"
                  width={100}
                  height={24}
                  onPress={()=>handleFollowSubThread()}
                >
                  <Text fontSize="$2">Follow</Text>
                </Button>
              )}
            </XStack>
          </View>
        </XStack>
      </XStack>
      <YStack pr={"$3"} pl={"$3"} pb={"$1.5"} gap="$1">
        <Text color="$primary">{subthread.description}</Text>
      </YStack>
    </View>
  );
};
