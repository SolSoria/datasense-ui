import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    isLoggedIn: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoginSession: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = action.payload.isLoggedIn;
        },
        setLogoutSession: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
        }
    }
});

export const { setLoginSession, setLogoutSession } = authSlice.actions;

export default authSlice.reducer;