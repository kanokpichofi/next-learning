import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
    name: "company",
    initialState: {
        companies: null,
    },
    reducers: {
        SET_COMPANY: (state, action) => {
            state.companies = action.payload;
        },
    },
});

export const { SET_COMPANY } = companySlice.actions;

export default companySlice.reducer;
