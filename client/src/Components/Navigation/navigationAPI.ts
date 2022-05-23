import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const herokuURL = "https://ttodorov.herokuapp.com/";

export const navigationAPI = createApi({
  reducerPath: "navigationAPI",
  baseQuery: fetchBaseQuery({ baseUrl: herokuURL }),
  endpoints: (builder) => ({
    getSignToken: builder.mutation({
      query: (forToken) => ({
        url: `auth/signin`,
        method: "POST",
        body: forToken,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSignTokenMutation } = navigationAPI;

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
