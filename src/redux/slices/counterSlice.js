import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchItems = createAsyncThunk(
    'items/fetchItems',
    async function (pageNumber) {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${pageNumber}`)
        const data = await response.json()
        return data
    }
)

const initialState = {
    items: [],
    status: null,
    error: null,
    pages: null
}

export const counterSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        like(state, action) {
            state.items.map(item => {
                if (action.payload === item.id) {
                    return item.like = !item.like
                }
            })
        },
        removeItem(state, action) {
            state.items = state.items.filter(item => {
                if (action.payload !== item.id) {
                    return item
                }
            })
        },
        likedCards(state) {
            state.items = state.items.filter(item => {
                if (item.like === true) {
                    return item
                }
            })
        }
    },
    extraReducers: {
        [fetchItems.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [fetchItems.fulfilled]: (state, action) => {
            state.status = 'resloved'
            state.items = [...state.items, ...action.payload.results.map((item => ({ ...item, like: false })))]
            state.pages = action.payload.info.pages
        },
        [fetchItems.rejected]: (state, action) => { },
    }
})

export const { like, removeItem } = counterSlice.actions

export default counterSlice.reducer