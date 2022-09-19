import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogged: false,
        userDetails: {}
    },
    reducers: {
        setIsLogged: (state, action) => {
            state.isLogged = action.payload
        },
        setUserDetails: (state, action) => {
            state.userDetails = action.payload
        },
    }
})
export const { setIsLogged, setUserDetails } = userSlice.actions

export default userSlice.reducer