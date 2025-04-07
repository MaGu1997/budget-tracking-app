import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Text,
  Group,
  ActionIcon,
  Button,
  Modal,
  TextInput,
} from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchExpenses,
  addExpense,
  deleteExpense,
} from "../../store/slices/expensesSlice";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import IconDelete from "../../assets/icons/IconDelete";
import { useDisclosure } from "@mantine/hooks";
import { useLocation } from "react-router-dom";

const ExpensesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    data: expenses,
    totalExpenses,
    loading,
    error,
  } = useAppSelector((state) => state.expenses);

  const location = useLocation();
  const { state } = location;

  const [opened, { open, close }] = useDisclosure(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    amount: "",
  });

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  useEffect(() => {
    if (state?.openModal) {
      open();
    }
  }, [state, open]);

  const handleAddExpense = async () => {
    await dispatch(
      addExpense({ ...formData, amount: parseFloat(formData.amount) })
    );
    close();
    setFormData({ name: "", category: "", amount: "" });
  };

  const handleDeleteExpense = (id: number) => {
    dispatch(deleteExpense(id));
  };

  const handleExportReport = () => {
    const doc = new jsPDF();

    // Add title
    doc.text("Expenses Report", 14, 10);

    // Prepare table data
    const tableColumn = ["Name", "Category", "Amount", "Date"];
    const tableRows = expenses.map((expense) => [
      expense.name,
      expense.category,
      `$${expense.amount.toFixed(2)}`,
      expense.date,
    ]);

    // Add table to PDF
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    // Save the PDF
    doc.save("expenses_report.pdf");
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="red">{error}</Text>;
  if (expenses.length === 0)
    return (
      <>
        <Text>No expenses found.</Text>
        <Button color="green" onClick={open}>
          Add Expense
        </Button>
        <Modal opened={opened} onClose={close} title="Add Expense">
          <TextInput
            label="Name"
            placeholder="Enter name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            mb="sm"
          />
          <TextInput
            label="Category"
            placeholder="Enter category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            mb="sm"
          />
          <TextInput
            label="Amount"
            placeholder="Enter amount"
            type="number"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            mb="sm"
          />
          <Group p="right">
            <Button variant="default" onClick={close}>
              Cancel
            </Button>
            <Button onClick={handleAddExpense}>Submit</Button>
          </Group>
        </Modal>
      </>
    );

  const allExpenses = expenses.map((expense, index) => (
    <Table.Tr key={expense.id}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{expense.name}</Table.Td>
      <Table.Td>{expense.category}</Table.Td>
      <Table.Td>${expense.amount.toFixed(2)}</Table.Td>
      <Table.Td>{expense.date}</Table.Td>
      <Table.Td>
        <Group>
          <ActionIcon
            color="red"
            onClick={() => handleDeleteExpense(expense.id)}
          >
            <IconDelete />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container ml={10}>
      <Text size="xl" fw={700} my="md">
        Expenses Page
      </Text>

      <Table withColumnBorders withTableBorder my={15}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>#</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{allExpenses}</Table.Tbody>
      </Table>
      <Text mb={10}>Total Expenses: ${totalExpenses.toFixed(2)}</Text>
      <Group mb="md">
        <Button color="green" onClick={open}>
          Add Expense
        </Button>
        <Button color="blue" onClick={handleExportReport}>
          Export Report
        </Button>
      </Group>
      {/* Modal for adding expense */}
      <Modal opened={opened} onClose={close} title="Add Expense">
        <TextInput
          label="Name"
          placeholder="Enter name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          mb="sm"
        />
        <TextInput
          label="Category"
          placeholder="Enter category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          mb="sm"
        />
        <TextInput
          label="Amount"
          placeholder="Enter amount"
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          mb="sm"
        />
        <Group p="right">
          <Button variant="default" onClick={close}>
            Cancel
          </Button>
          <Button onClick={handleAddExpense}>Submit</Button>
        </Group>
      </Modal>
    </Container>
  );
};

export default ExpensesPage;
