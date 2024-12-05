import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { IRegisterUserRequest, IVerifyEmailRequest } from "types/request/auth";
import { APIResponse } from "types/response";

export const authApi = createApi({
    reducerPath: "auths",
    baseQuery: baseQuery,
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        registerUser: builder.mutation<APIResponse<any>, IRegisterUserRequest >({
            invalidatesTags: ['Auth'],
            query: (body) => {
                return {
                    url: "/v1/auth/register",
                    method: "POST",
                    body
                }
            },
        }),
        verifyEmail: builder.mutation<APIResponse<any>, IVerifyEmailRequest >({
            invalidatesTags: ['Auth'],
            query: (body) => {
                return {
                    url: "/v1/auth/verify-email",
                    method: "POST",
                    body
                }
            },
        }),
    }),
});
export const { useRegisterUserMutation, useVerifyEmailMutation} = authApi;