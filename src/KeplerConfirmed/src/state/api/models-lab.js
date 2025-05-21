import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const modelsLabApi = createApi({
    reducerPath: 'modelsLabApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://modelslab.com/api/v6' }),
    endpoints: (builder) => ({
        generateImageFromText: builder.mutation({
            query: ({ prompt }) => ({
                url: `/realtime/text2img`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    key: process.env.REACT_APP_MODELS_LAB_API_KEY,
                    prompt,
                    negative_prompt: "blurry, not detailed, not accurate",
                    width: "1280",
                    height: "720",
                    samples: 1,
                },
            }),
        }),
    }),
})

export const { useGenerateImageFromTextMutation } = modelsLabApi