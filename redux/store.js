import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./company"

export default configureStore({
    reducer: {
        company: companyReducer
    },
});
