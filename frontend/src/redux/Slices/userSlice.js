import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    currentUser: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        startLogin: (state) => {
            state.loading = true
        },
        LoginSuccess: (state, action) => {
            state.loading = false
            state.currentUser = action.payload
        },
        LoginFail: (state) => {
            state.loading = false
            state.currentUser = null
        },
        Logout: (state) => {
            state.currentUser = null
        },
        subscribtion: (state, action) => {
            if(!state.currentUser.subscriptedUser.includes(action.payload)){
                state.currentUser.subscriptedUser.push(action.payload);
            }else{
                state.currentUser.subscriptedUser.splice(state.currentUser.subscriptedUser.findIndex(i => i === action.payload));
            }
        }
    }
})

export const {startLogin, LoginSuccess, LoginFail, subscribtion, Logout} = userSlice.actions;

export default userSlice.reducer;