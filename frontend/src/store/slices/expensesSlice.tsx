import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type Expense = {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string;
};

type ExpensesState = {
  data: Expense[];
  totalExpenses: number; // Added to store the total expenses
  loading: boolean;
  error: string | null;
};

const initialState: ExpensesState = {
  data: [],
  totalExpenses: 0, // Initialize total expenses
  loading: false,
  error: null,
};

// Fetch expenses from the backend
export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async () => {
    const response = await axios.get("http://127.0.0.1:8000/expenses");
    return response.data; // Return the entire response object
  }
);

// Add a new expense
export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async (expense: Omit<Expense, "id" | "date">) => {
    const response = await axios.post(
      "http://127.0.0.1:8000/expenses/add",
      expense
    );
    return response.data;
  }
);

// Delete an expense
export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (id: number) => {
    await axios.delete(`http://127.0.0.1:8000/expenses/delete/${id}`);
    return id;
  }
);

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.expenses; // Extract the `expenses` array
        state.totalExpenses = action.payload.total_expenses; // Extract `total_expenses`
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch expenses";
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.totalExpenses += action.payload.amount; // Update total expenses
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        const deletedExpense = state.data.find(
          (expense) => expense.id === action.payload
        );
        if (deletedExpense) {
          state.totalExpenses -= deletedExpense.amount; // Update total expenses
        }
        state.data = state.data.filter(
          (expense) => expense.id !== action.payload
        );
      });
  },
});

export default expensesSlice.reducer;
