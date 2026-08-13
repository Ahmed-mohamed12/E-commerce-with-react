// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const ProductsApiApi = createApi({
  reducerPath: 'ProductsApiApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BASE_URL}/api/` }),
  endpoints: (builder) => ({
    getProductsApiByName: builder.query({
      query: (name) => `${name}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsApiByNameQuery } = ProductsApiApi