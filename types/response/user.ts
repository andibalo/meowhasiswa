import { IUser, IUserDevice } from "types/model";
import { APIResponse } from "./common";

export type FetchUserProfileAPIResponse = APIResponse<IUser>;

export type FetchUserDeviceAPIResponse = APIResponse<IUserDevice[]>;
