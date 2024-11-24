import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import { UploadImageAPIResponse } from 'types/response';
import { IUploadImageRequest } from 'types/request/image';

export const imageApi = createApi({
    reducerPath: "image",
    baseQuery: baseQuery,
    tagTypes: ['Image'],
    endpoints: (builder) => ({
        uploadImage: builder.mutation<UploadImageAPIResponse, IUploadImageRequest>({
            invalidatesTags: ['Image'],
            query: (body) => {
                const form = new FormData();

                form.append('image', body.uri);

                if (body.fileName) {
                    form.append('file_name', body.fileName);
                }

                return {
                    url: "/v1/image/upload",
                    method: "POST",
                    body,
                    formData: true
                }
            },
        }),
    }),
});

export const { useUploadImageMutation } = imageApi;