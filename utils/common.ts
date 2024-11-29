import { DEVICE_PHONE, DEVICE_TABLET, DEVICE_UNKNOWN } from "constants/common";
import { DeviceType } from "expo-device";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

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

export const formateDateWithDaysAgoThreshold = (date: string, daysThreshold: number): string => {
    const today = dayjs();
    const targetDate = dayjs(date);

    const daysDiff = today.diff(targetDate, 'day');

    if (daysDiff <= daysThreshold) {
        return targetDate.fromNow()
    } else {
        return targetDate.format('YYYY-MM-DD');
    }
}