import { cookieService } from "@/services/cookieService";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:44316" }),
  tagTypes: ["GetInfo"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "Auth/v1/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "Auth/v1/register",
        method: "POST",
        body,
      }),
    }),
    refreshToken: builder.mutation({
      query: (body) => ({
        url: "Auth/v1/refresh",
        method: "POST",
        body,
      }),
    }),
    getInfo: builder.query({
      query: (token) => ({
        url: "Account/v1/GetInfo",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["GetInfo"],
    }),
  }),
});

export default authApi;
export const { useLoginMutation, useRegisterMutation, useRefreshTokenMutation, useGetInfoQuery } = authApi; 