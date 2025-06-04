import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:16958/catalog/v1/" }),
  endpoints: (builder) => ({
    getHomePageCategories: builder.query({
      query: () => "Category/GetHomePageCategories",
    }),
  }),
});

export const { useGetHomePageCategoriesQuery } = catalogApi;
