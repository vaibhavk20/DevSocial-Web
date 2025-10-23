import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionsReducer from "./connectionSlice";
import requestsReducer from "./requestsSlice";

const appStore = configureStore({
    reducer: {
        // Add your reducers here
        user: userReducer,
        feed: feedReducer,
        connections: connectionsReducer,
        requests: requestsReducer,
    },
});

export default appStore;
