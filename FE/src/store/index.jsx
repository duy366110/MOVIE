import { configureStore } from "@reduxjs/toolkit";
import PageSlice from "./store-page";

const store = configureStore({
    reducer: {
        component: PageSlice,
    }
})

export default store;