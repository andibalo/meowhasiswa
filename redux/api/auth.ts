import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { IRegisterUserRequest, IResetPasswordRequest, ISendResetPasswordCodeRequest, IVerifyEmailRequest, IVerifyResetPasswordCodeRequest } from "types/request/auth";
import { APIResponse } from "types/response";

export const authApi = createApi({
    reducerPath: "auths",
    baseQuery: baseQuery,
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        registerUser: builder.mutation<APIResponse<any>, IRegisterUserRequest>({
            invalidatesTags: ['Auth'],
            query: (body) => {
                return {
                    url: "/v1/auth/register",
                    method: "POST",
                    body
                }
            },
        }),
        verifyEmail: builder.mutation<APIResponse<any>, IVerifyEmailRequest>({
            invalidatesTags: ['Auth'],
            query: (body) => {
                return {
                    url: "/v1/auth/verify-email",
                    method: "POST",
                    body
                }
            },
        }),
        resetPassword: builder.mutation<APIResponse<any>, IResetPasswordRequest>({
            query: (body) => {
                return {
                    url: "/v1/auth/reset-password",
                    method: "PATCH",
                    body
                }
            },
        }),
        sendResetPasswordCode: builder.mutation<APIResponse<any>, ISendResetPasswordCodeRequest>({
            query: (body) => {
                return {
                    url: "/v1/auth/reset-password/code/send",
                    method: "POST",
                    body
                }
            },
        }),
        verifyResetPasswordCode: builder.mutation<APIResponse<any>, IVerifyResetPasswordCodeRequest>({
            query: (body) => {
                return {
                    url: "/v1/auth/reset-password/code/verify",
                    method: "PATCH",
                    body
                }
            },
        }),
    }),
});
export const {
    useRegisterUserMutation,
    useVerifyEmailMutation,
    useSendResetPasswordCodeMutation,
    useVerifyResetPasswordCodeMutation,
    useResetPasswordMutation
} = authApi;