// @ts-nocheck
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfoState, SellerDetails, ProductDetails } from "./type";

const initialState: UserInfoState = {
  language: "",
  sellerDetails: {
    name: "",
    state: "",
    language: "",
    category: "",
  },
  productDetails: {
    title: "",
    pricing: 0,
    description: "",
    variations: [],
    images: [],
  },
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setSellerDetails: (state, action: PayloadAction<SellerDetails>) => {
      state.sellerDetails = action.payload;
    },
    setProductDetails: (state, action: PayloadAction<ProductDetails>) => {
      state.productDetails = action.payload;
    },
  },
});

export const { setLanguage, setSellerDetails, setProductDetails } =
  userInfoSlice.actions;

export default userInfoSlice.reducer;
