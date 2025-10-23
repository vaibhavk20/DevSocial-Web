import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addRequests: (state, action) => action.payload,
        clearRequests: (state, action) => null,
    },
});

export const { addRequests, clearRequests } = requestsSlice.actions;
export default requestsSlice.reducer;
