import React, { useEffect } from "react";
import { Container, Text } from "@mantine/core";
import CategoriesCard from "./CategoriesCard";
import TransactionsCard from "./TransactionsCard";
import QuickAccess from "./QuickAccess";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchExpenses } from "../../store/slices/expensesSlice";
import { fetchIncome } from "../../store/slices/incomeSlice";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  // Fetch expenses and income from Redux store
  const {
    data: expenses,
    loading: expensesLoading,
    error: expensesError,
  } = useAppSelector((state) => state.expenses);

  const {
    data: income,
    loading: incomeLoading,
    error: incomeError,
  } = useAppSelector((state) => state.income);

  // Fetch data if not already fetched
  useEffect(() => {
    if (expenses.length === 0) {
      dispatch(fetchExpenses());
    }
    if (income.length === 0) {
      dispatch(fetchIncome());
    }
  }, [dispatch, expenses.length, income.length]);

  // Show error state
  if (expensesError) {
    return <Text color="red">Error fetching expenses: {expensesError}</Text>;
  }
  if (incomeError) {
    return <Text color="red">Error fetching income: {incomeError}</Text>;
  }

  // Show loading state
  if (expensesLoading || incomeLoading) {
    return <Text>Loading...</Text>;
  }

  // Combine expenses and income into a single list
  const transactions = [
    ...expenses.map((expense) => ({
      ...expense,
      type: "expense",
    })),
    ...income.map((inc) => ({
      ...inc,
      type: "income",
    })),
  ];

  // Filter transactions by categories
  const categories = transactions.reduce((acc, transaction) => {
    const { category, type, amount } = transaction;
    if (!acc[category]) {
      acc[category] = { income: 0, expense: 0 };
    }
    if (type === "income") {
      acc[category].income += amount;
    } else if (type === "expense") {
      acc[category].expense += amount;
    }
    return acc;
  }, {} as Record<string, { income: number; expense: number }>);

  // Convert categories object to an array for rendering
  const categoryList = Object.entries(categories).map(([name, totals]) => ({
    name,
    totalIncome: totals.income,
    totalExpense: totals.expense,
  }));

  return (
    <Container ml={10} mr={10}>
      <Text size="lg" fw={700} mb="md">
        Welcome to the Budget Tracker
      </Text>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-start", // Space between the cards
        }}
      >
        <div style={{ width: "40%", paddingRight: "5px" }}>
          <CategoriesCard categories={categoryList} />
        </div>
        <div style={{ width: "60%" }}>
          <TransactionsCard transactions={transactions} />
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <QuickAccess />
      </div>
    </Container>
  );
};

export default HomePage;
