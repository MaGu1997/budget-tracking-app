import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type Income = {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string;
};

type IncomeState = {
  data: Income[];
  totalIncome: number;
  loading: boolean;
  error: string | null;
};

const initialState: IncomeState = {
  data: [],
  totalIncome: 0,
  loading: false,
  error: null,
};

// Fetch income from the backend
export const fetchIncome = createAsyncThunk("income/fetchIncome", async () => {
  const response = await axios.get("http://127.0.0.1:8000/income");
  return response.data; // Return the entire response object
});

// Add a new income
export const addIncome = createAsyncThunk(
  "income/addIncome",
  async (income: Omit<Income, "id" | "date">) => {
    const response = await axios.post(
      "http://127.0.0.1:8000/income/add",
      income
    );
    return response.data; // Backend will return the full income object with id and date
  }
);
// Delete an income
export const deleteIncome = createAsyncThunk(
  "income/deleteIncome",
  async (id: number) => {
    await axios.delete(`http://127.0.0.1:8000/income/delete/${id}`);
    return id;
  }
);
const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncome.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.income; // Extract the `income` array
        state.totalIncome = action.payload.total_income; // Extract `total_income`
      })
      .addCase(fetchIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch income";
      })
      .addCase(addIncome.fulfilled, (state, action) => {
        state.data.push(action.payload); // Add the new income with id and date
        state.totalIncome += action.payload.amount; // Update total income
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        // Remove the deleted income from the state
        state.data = state.data.filter((income) => income.id !== action.payload);
        state.totalIncome = state.data.reduce((sum, income) => sum + income.amount, 0); // Recalculate total income
      });
  },
});

export default incomeSlice.reducer;
