import React, { useEffect } from "react";
import { Container, Table, Text, Button, Group } from "@mantine/core";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchExpenses } from "../../store/slices/expensesSlice";
import { fetchIncome } from "../../store/slices/incomeSlice";

const ExportPage: React.FC = () => {
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

  // Handle exporting transactions to PDF
  const handleExport = () => {
    const doc = new jsPDF();

    // Add title
    doc.text("Transactions Report", 14, 10);

    // Prepare table data
    const tableColumn = ["Name", "Type", "Category", "Amount", "Date"];
    const tableRows = transactions.map((transaction) => [
      transaction.name,
      transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1),
      transaction.category,
      `$${transaction.amount.toFixed(2)}`,
      transaction.date,
    ]);

    // Add table to PDF
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    // Save the PDF
    doc.save("transactions_report.pdf");
  };

  // Handle loading and error states
  if (expensesLoading || incomeLoading) return <Text>Loading...</Text>;
  if (expensesError) return <Text c="red">{expensesError}</Text>;
  if (incomeError) return <Text c="red">{incomeError}</Text>;
  if (transactions.length === 0) return <Text>No transactions found.</Text>;

  // Map transactions to table rows
  const allTransactions = transactions.map((transaction, index) => (
    <Table.Tr key={transaction.id}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{transaction.name}</Table.Td>
      <Table.Td>
        <Text color={transaction.type === "expense" ? "red" : "green"}>
          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
        </Text>
      </Table.Td>
      <Table.Td>{transaction.category}</Table.Td>
      <Table.Td>${transaction.amount.toFixed(2)}</Table.Td>
      <Table.Td>{transaction.date}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Container ml={10}>
      <Text size="xl" fw={700} my="md">
        Export Page
      </Text>
      <Table withColumnBorders withTableBorder my={15}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>#</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>Date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{allTransactions}</Table.Tbody>
      </Table>
      <Group>
        <Button mt="md" color="blue" onClick={handleExport}>
          Export to PDF
        </Button>
      </Group>
    </Container>
  );
};

export default ExportPage;
