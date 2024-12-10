import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery'
import { FetchUserProfileAPIResponse } from 'types/response/user'
import { APIResponse } from 'types/response';

export const userApi = createApi({
    reducerPath: "user",
    baseQuery: baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        fetchUserProfile: builder.query<FetchUserProfileAPIResponse, void>({
            providesTags: ['User'],
            query: () => {
                return {
                    url: `/v1/user/profile`,
                    method: "GET"
                }
            },
        }),
        banUser: builder.mutation<APIResponse<any>, string>({
            invalidatesTags: ['User'],
            query: (userId) => {
                return {
                    url: `/v1/user/ban/${userId}`,
                    method: "PATCH",
                }
            },
        }),
        unBanUser: builder.mutation<APIResponse<any>, string>({
            invalidatesTags: ['User'],
            query: (userId) => {
                return {
                    url: `/v1/user/unban/${userId}`,
                    method: "PATCH",
                }
            },
        }),
    }),
})

export const { useFetchUserProfileQuery, useBanUserMutation, useUnBanUserMutation } = userApi
