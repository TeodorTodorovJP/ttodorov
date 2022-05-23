import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import counterReducer from '../Components/counter/counterSlice';
import { serverApi } from '../Components/counter/counterAPI';

import navigationReducer from "../Components/Navigation/navigationSlice";
import { navigationAPI } from "../Components/Navigation/navigationAPI";

import storeDataReducer from "../Components/StoreData/storeDataSlice";
import { storeDataAPI } from "../Components/StoreData/storeDataAPI";

export const store = configureStore({
  reducer: {
    [serverApi.reducerPath]: serverApi.reducer,
    counter: counterReducer,

    [navigationAPI.reducerPath]: navigationAPI.reducer,
    navigation: navigationReducer,

    [storeDataAPI.reducerPath]: storeDataAPI.reducer,
    storeData: storeDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      serverApi.middleware,
      navigationAPI.middleware,
      storeDataAPI.middleware
    ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
