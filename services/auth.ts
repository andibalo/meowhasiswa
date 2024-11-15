import { ILoginRequest, IRegisterRequest } from "types/request/auth";
import axiosInstance from "./axiosInstance";
import { APIResponse } from "types/response/common";
import { AxiosResponse } from "axios";


export const login = async (
    payload: ILoginRequest
): Promise<AxiosResponse<APIResponse<string>> | undefined> => {
    //TODO: add error handling
    try {
        const res = await axiosInstance.post<APIResponse<string>>(
            "/v1/auth/login",
            payload,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

        return res
    } catch (e) {
        console.log(e, "DWADWA")
        // throw await wrapError(e);
    }
};

export const register = async (
  payload: IRegisterRequest
): Promise<AxiosResponse<APIResponse<string>> | undefined> => {
  //TODO: add error handling
  try {
      const res = await axiosInstance.post<APIResponse<string>>(
          "/v1/auth/register",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

      return res
  } catch (e) {
      console.log(e, "DWADWA")
      // throw await wrapError(e);
  }
};