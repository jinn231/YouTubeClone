import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    currentVideo: null
}

const VideoSlice = createSlice({
    name: "Video",
    initialState,
    reducers: {
        fetchVideoStart: (state) => {
            state.loading = true
        },
        fetchVideoSuccess: (state, action) => {
            state.loading = false
            state.currentVideo = action.payload
        },
        fetchVideoFail: (state) => {
            state.loading = false
            state.currentVideo = null
        },
        like: (state, action) => {
            if(!state.currentVideo.like.includes(action.payload)){
                state.currentVideo.like.push(action.payload)
                state.currentVideo.dislike.splice(state.currentVideo.dislike.findIndex(i => i === action.payload),1)
            }else{
                state.currentVideo.like.splice(state.currentVideo.like.findIndex(i => i === action.payload),1)
            }
        },
        dislike: (state, action) => {
            if(!state.currentVideo.dislike.includes(action.payload)){
                state.currentVideo.dislike.push(action.payload)
                state.currentVideo.like.splice(state.currentVideo.like.findIndex(i => i === action.payload),1)
            }else{
                state.currentVideo.dislike.splice(state.currentVideo.dislike.findIndex(i => i === action.payload),1)
            }
        }
    }
})

export const {fetchVideoStart, fetchVideoSuccess , fetchVideoFail, like, dislike } = VideoSlice.actions;

export default VideoSlice.reducer;