import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./GameRedux";

const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export default store;
