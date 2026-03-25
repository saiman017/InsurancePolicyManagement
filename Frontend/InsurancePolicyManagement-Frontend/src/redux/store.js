import { configureStore } from "@reduxjs/toolkit";
import policyReducer from "./slice/policy";

const store = configureStore({
  reducer: {
    policy: policyReducer,
  },
});

export default store;