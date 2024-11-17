import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { APP_NAME } from "constants/common";
import { RootState } from "redux/store";

export const baseQuery = fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_CORE_SERVICE_API_URL,
    headers: {
        'X-Client-Id': APP_NAME
    },
    prepareHeaders: (headers, { getState }) => {

        const enableUseStaticToken = process.env.EXPO_PUBLIC_ENABLE_STATIC_TOKEN

        if (enableUseStaticToken === "1") {
            // TODO: REMOVE AFTER DEV FINISH
            headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZGkudXNtYW5Ac3R1ZGVudC51bW4uYWMuaWQiLCJpZCI6ImYzY2I4NTM1LTk5NzctNGExYy04NzRhLTJjMGUxYmVkNTAzZCIsInJvbGUiOiJVU0VSIiwidXNlcm5hbWUiOiJpbmNvbnNpc3RlbmNlIn0.3nfOIkVqTJTHbv_6VG1zOG6n3SAk9QIq5U49GOx7mLw`)
            return headers
        }

        const token = (getState() as RootState).auth.token

        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }

        return headers
    },
})
