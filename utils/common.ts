import { DEVICE_PHONE, DEVICE_TABLET, DEVICE_UNKNOWN } from "constants/common";
import { DeviceType } from "expo-device";

export const bytesToMegaBytes = (bytes: number, digits: number = 1): number =>
    parseFloat((bytes / (1024 * 1024)).toFixed(digits));


export const getDeviceTypeFromEnum = (deviceType: DeviceType | null): string | null => {

    if (!deviceType) {
        return null
    }

    switch (deviceType) {
        case DeviceType.PHONE:
            return DEVICE_PHONE
        case DeviceType.TABLET:
            return DEVICE_TABLET
        default:
            return DEVICE_UNKNOWN
    }
}