import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery'
import { FetchUserProfileAPIResponse } from 'types/response/user'

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
    }),
})

export const { useFetchUserProfileQuery } = userApi
