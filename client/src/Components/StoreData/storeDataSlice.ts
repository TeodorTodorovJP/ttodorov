import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import * as constants from "../../constants/constants";

// import { fetchCount } from './counterAPI';

export interface StoreDataState {
  inputDescription: string;
  inputValue: string;
}

const initialState: StoreDataState = {
  inputDescription: "",
  inputValue: "",
};

export const storeDataSlice = createSlice({
  name: "storeData",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    storeData: (state, action: PayloadAction<keyof constants.Themes>) => {
      //state.theme = action.payload;
      console.log("In storeData");
    },
    getData: (state, action: PayloadAction<keyof constants.Themes>) => {
      //state.theme = action.payload;
      console.log("In getData");
    },
    updateCurrentData: (state, action) => {
      //state.theme = action.payload;
      const { type, data } = action.payload;
      if (type === "type") {
        state.inputValue = type;
      }
      if (type === "data") {
        state.inputDescription = type;
      }
    },
  },
});

export const { storeData, getData, updateCurrentData } = storeDataSlice.actions;

export const selectState = (state: RootState) => state.storeData;

export default storeDataSlice.reducer;
