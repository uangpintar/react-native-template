import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { functionsBaseQuery } from '../baseQuery';

export interface IProductsDetail {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface IProducts {
  products: IProductsDetail[];
  total: number;
  skip: number;
  limit: number;
}

const reducerPath = 'productsAPI';

export const productsAPI = createApi({
  reducerPath: reducerPath,
  baseQuery: functionsBaseQuery(),
  tagTypes: ['Products'],
  keepUnusedDataFor: process.env.NODE_ENV !== 'test' ? 60 : 0,
  endpoints: (builder) => ({
    getProduct: builder.query<IProducts, string>({
      query: (query) => `/products/search?q=${query}`,
      providesTags: ['Products'],
    }),
    // searchProducts: builder.mutation<any, { id: number; title: string }>({
    //   query: (query) => `/products/search?q=${query}`,
    //   onQueryStarted: ({ id, title }, { dispatch, queryFulfilled }) => {
    //     dispatch(
    //       productsAPI.util.updateQueryData('getIntialProducts', undefined, (state) => {
    //         productsAPIAdapter.updateOne(state.products, { id, changes: { title } });
    //       }),
    //     );
    //   },
    // }),
    // refetchProducts: builder.mutation<null, void>({
    //   // The query is not relevant here, so a `null` returning `queryFn` is used
    //   queryFn: () => ({ data: null }),
    //   // This mutation takes advantage of tag invalidation behaviour to trigger
    //   // any queries that provide the 'Post' or 'User' tags to re-fetch if the queries
    //   // are currently subscribed to the cached data
    //   invalidatesTags: ['Products'],
    // }),
  }),
});

export const { useGetProductQuery } = productsAPI;
export const productsQueryReducer = { [reducerPath]: productsAPI.reducer };
