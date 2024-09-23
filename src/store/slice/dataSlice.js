import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getData = createAsyncThunk(
    'data/getData', 
    async function( _, {rejectWithValue}){
        try{
            const responseJSON = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=1&genres=1&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=2000&yearTo=2024&page=1`, {
                headers: {
                    "X-API-KEY": '7abb31d8-f85d-47c0-97bc-f25c197dd055',
                    "Content-Type": "application/json",
                    },
                });
            if(!responseJSON.ok){
                throw new Error('Something went wrong')
            }
            const response = await responseJSON.json();
            return response.items;
        }
        catch(error){
            return rejectWithValue(error.message)
        }
    }
)

const setError = (state, action)=>{
    state.status = 'rejected';
    state.error = action.payload;
}

const dataSlice = createSlice({
    name: 'data',
    initialState:{
        data:[],
        status: null,
        error: null,
    },
    reducers:{
        removeCard(state, action){
            state.data = state.data.filter(item => item.kinopoiskId !== action.payload)
        },
        toggleLikeCard(state, action){
            const toggleLike = state.data.find(item => item.kinopoiskId === action.payload);
            toggleLike.hasLike = !toggleLike.hasLike;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getData.pending, (state)=>{
            state.status = 'loading';
            state.error = null;
        })
        .addCase(getData.fulfilled, (state, action)=>{
            state.data = action.payload;
            state.status = 'resolved';
        })
        .addCase(getData.rejected, (state, action)=>{
            setError(state, action)
        })
    }
})

export const {removeCard, toggleLikeCard} = dataSlice.actions;
export default dataSlice.reducer;