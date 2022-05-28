import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { herokuURL } from "../../constants/constants";

const PORT = process.env.PORT ? herokuURL : "http://127.0.0.1:5000";

export const storeDataAPI = createApi({
  reducerPath: "storeDataAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `${PORT}/users` }),
  endpoints: (builder) => ({
    storeData: builder.mutation({
      query: ({ type, data }) => ({
        url: `storeData`,
        method: "POST",
        body: { type: type, description: data },
      }),
    }),
    getData: builder.query({
      query: (opt) => ({
        url: `getData`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useStoreDataMutation, useGetDataQuery } = storeDataAPI;

// return fetch(`/admins/user/Teodor`, {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json; charset=UTF-8",
//     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidW5pcXVlVXNlck5hbWUiOiJUZW9kb3JBZG1pbiIsInJvbGUiOiJhZG1pbiIsImlzQmFubmVkIjowLCJpc0RlbGV0ZWQiOjEsImlhdCI6MTY0ODI4OTUxMX0.rbWOzwdi5pvFLvWWDs_rokoKmyfmbmxl2t4QSZkfvRM`,
//   },
// })
//   .then((res) => res.json())
//   .then((res) => {
//     return res
//     console.log(res)
//   });
