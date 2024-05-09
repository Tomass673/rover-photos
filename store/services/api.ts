import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {API_KEY, API_URL} from "@/constants/config";
import {
    InfoResponse, PhotosResponse
} from "@/store/apiTypes";
const baseQuery = fetchBaseQuery({ baseUrl: API_URL })
const headers = {
    Accept: 'application/json'
}
export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQuery,
    tagTypes: [
        'RoverInfo',
        'Photos',
    ],
    endpoints: (builder) => ({
        getRoverInfo: builder.query<InfoResponse, void>({
            query: () => ({
                url: `?api_key=${API_KEY}`,
                method: 'GET',
                headers: headers,
            }),
        }),
        getPhotos: builder.query<PhotosResponse, { earth_date: string, camera: string }>({
            query: (arg) => {
                const {earth_date, camera} = arg;
                return {
                    url: `/photos?api_key=${API_KEY}`,
                    method: 'GET',
                    params: {earth_date, camera},
                    headers: headers,
                }
            },
            providesTags: (result: PhotosResponse | undefined) =>
                result
                    ? [
                        ...result.photos.map(({id}) => ({type: 'Photos' as const, id})),
                        {type: 'Photos'},
                    ]
                    : [{type: 'Photos'}],
        }),
    }),
});

export const {
    useGetRoverInfoQuery,
    useGetPhotosQuery
} = api;
