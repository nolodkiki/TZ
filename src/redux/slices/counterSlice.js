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
    likeItems: [],
    status: null,
    error: null,
    pages: null
}

export const counterSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        like(state, action) {
            state.items.forEach(item => {
                if (action.payload === item.id) {
                    return item.like = !item.like
                }
            })
        },
        likedItems(state, action) {
            state.likeItems = state.items.filter(item => {
                if (item.like) {
                    return item
                }
            })
        },
        removeItem(state, action) {
            state.items = state.items.filter(item => {
                if (action.payload !== item.id) {
                    return item
                }
            })
            state.likeItems = state.likeItems.filter(item => {
                if (action.payload !== item.id) {
                    return item
                }
            })
        },
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

export const { like, removeItem, likedItems } = counterSlice.actions

export default counterSlice.reducer