import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Subscription } from "expo-modules-core";
import * as TaskManager from "expo-task-manager";

const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";
const DEFAULT_NOTIFICATION_ROUTE = "/"

async function registerForPushNotificationsAsync() {
    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    if (!Device.isDevice) {
        throw new Error("Must use physical device for push notifications");
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== "granted") {
        throw new Error(
            "Permission not granted to get push token for push notification!"
        );
    }

    const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;

    if (!projectId) {
        throw new Error("Project ID not found");
    }

    try {
        const pushTokenString = (
            await Notifications.getExpoPushTokenAsync({
                projectId,
            })
        ).data;
        console.log(pushTokenString);


        return pushTokenString;
    } catch (e: unknown) {
        throw new Error(`${e}`);
    }
}

export const useNotifications = () => {

    const notificationListener = useRef<Subscription>();
    const responseListener = useRef<Subscription>();
    const [pushToken, setPushToken] = useState('')
    const [notifRoute, setNotifRoute] = useState('')

    const lastNotificationResponse = Notifications.useLastNotificationResponse()

    TaskManager.defineTask(
        BACKGROUND_NOTIFICATION_TASK,
        ({ data, error, executionInfo }) => {
            console.log("✅ Received a notification in the background!", {
                data,
                error,
                executionInfo,
            });
            // Do something with the notification data
        }
    );

    useEffect(() => {
        registerForPushNotificationsAsync().
            then((token) => {
                setPushToken(token)
            }).
            catch(err => console.log("ERROR", err))

        Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK)

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                console.log("🔔 Notification Received: ", notification);

            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener((response) => {
                console.log(
                    "🔔 Notification Response: ",
                    JSON.stringify(response, null, 2),
                    JSON.stringify(response.notification.request.content.data, null, 2)
                );
                // Handle the notification response here
                const notifRouteData = response.notification.request.content.data.route

                const route: any = notifRouteData ? String(notifRouteData) : DEFAULT_NOTIFICATION_ROUTE

                setNotifRoute(route)
            });

        return () => {
            if (notificationListener.current) {
                Notifications.removeNotificationSubscription(
                    notificationListener.current
                );
            }

            if (responseListener.current) {
                Notifications.removeNotificationSubscription(responseListener.current);
            }

            Notifications.unregisterTaskAsync(BACKGROUND_NOTIFICATION_TASK)
        };
    }, []);

    // useEffect(() => {
    //     if (lastNotificationResponse) {
    //         const notifRouteData = lastNotificationResponse.notification.request.content.data.route

    //         const route: any = notifRouteData ? String(notifRouteData) : DEFAULT_NOTIFICATION_ROUTE

    //         setNotifRoute(route)
    //     }
    // }, [lastNotificationResponse]);

    return {
        pushToken,
        notifRoute
    }
};