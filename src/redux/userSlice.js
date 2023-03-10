import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogged: false,
        userDetails: {},
        userSites: {},
        currentSite: {},
        currentDevice: {}
    },
    reducers: {
        setIsLogged: (state, action) => {
            state.isLogged = action.payload
        },
        setUserDetails: (state, action) => {
            state.userDetails = action.payload
        },
        setSiteDetails: (state, action) => {
            state.userSites = action.payload
        },
        setCurrentSite: (state, action) => {
            state.currentSite = action.payload
        },
        setCurrentDevice: (state, action) => {
            state.currentDevice = action.payload
        }
    }
})
export const { setIsLogged, setUserDetails, setSiteDetails, setCurrentSite, setCurrentDevice } = userSlice.actions

export default userSlice.reducer