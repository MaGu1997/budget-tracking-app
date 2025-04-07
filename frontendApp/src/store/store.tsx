import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./slices/expensesSlice";
import incomeReducer from "./slices/incomeSlice";

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    income: incomeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
