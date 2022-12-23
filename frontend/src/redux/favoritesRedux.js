import { createSlice } from '@reduxjs/toolkit'

const favoriteSlice = createSlice({
    name: "favorite",
    initialState: {
        favorite: []
    },
    reducers: {
        addFavorite: (state, action) => {
            let isexisting = state.favorite.filter(f => f.id === action.payload.id)
            if (isexisting == 0) {
                state.favorite.push(action.payload)
            }
        },
        removeFavorite: (state, action) => {
            state.favorite = state.favorite.filter(f => f.id !== action.payload.id)
        }
    }
})

export const { addFavorite, removeFavorite } = favoriteSlice.actions
export default favoriteSlice.reducer