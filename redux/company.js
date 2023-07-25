import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
    name: "company",
    initialState: {
        company: null,
    },
    reducers: {
        SET_COMPANY: (state, action) => {
            state.company = action.payload;
        },
    },
});

export const { SET_COMPANY } = companySlice.actions;

export default companySlice.reducer;
