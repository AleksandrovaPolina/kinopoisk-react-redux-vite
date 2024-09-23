import { configureStore } from "@reduxjs/toolkit";
import dataReducer from './slice/dataSlice'
import filterReducer from './slice/filterSlice'

export const store = configureStore({
    reducer:{
        data: dataReducer,
        filter: filterReducer,
    }
})