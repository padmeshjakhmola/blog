import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "./commentSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
        comments: commentReducer
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
