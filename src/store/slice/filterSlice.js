import { createSlice } from "@reduxjs/toolkit";


const filterSlice = createSlice({
    name: 'filters',
    initialState: false,
    reducers:{
        changeFilter: (_, action) => action.payload,
    }
})

export const { changeFilter } = filterSlice.actions;
export default filterSlice.reducer;