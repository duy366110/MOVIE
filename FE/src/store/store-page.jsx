import { createSlice } from "@reduxjs/toolkit";

const initState = {
    page: {
        header: {
            scroll: false,
        },
        home: {
            poster: '',
            title: '',
            overview: ''
        },
        loader: {
            status: false
        },
        error: {
            status: false,
            message: '',
        }
    }
}

const pageSlice = createSlice({
    name: 'Page',
    initialState: initState,
    reducers: {
        loaderStart: (state, action) => {
            state.page.loader.status = true;

        },
        loaderEnd: (state) => {
            state.page.loader.status = false;
            
        },
        setInforHomePage: (state, action) => {
            state.page.home.poster = action.payload.poster;
            state.page.home.title = action.payload.title;
            state.page.home.overview = action.payload.overview;
        },
        scrollHeader: (state, action) => {
            state.page.header.scroll = action.payload.scroll;
        }
    }
})

export const { loaderStart, loaderEnd, setInforHomePage, scrollHeader } = pageSlice.actions;

export default pageSlice.reducer;