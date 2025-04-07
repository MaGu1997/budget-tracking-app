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
  fetchIncome,
  addIncome,
  deleteIncome,
} from "../../store/slices/incomeSlice";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import IconDelete from "../../assets/icons/IconDelete";
import { useDisclosure } from "@mantine/hooks";
import { useLocation } from "react-router-dom";

const IncomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    data: incomeRecords,
    totalIncome,
    loading,
    error,
  } = useAppSelector((state) => state.income);

  const location = useLocation();
  const { state } = location;

  const [opened, { open, close }] = useDisclosure(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    amount: "",
  });

  useEffect(() => {
    dispatch(fetchIncome());
  }, [dispatch]);

  useEffect(() => {
    if (state?.openModal) {
      open();
    }
  }, [state, open]);

  const handleAddIncome = async () => {
    await dispatch(
      addIncome({ ...formData, amount: parseFloat(formData.amount) })
    );
    close();
    setFormData({ name: "", category: "", amount: "" });
  };

  const handleDeleteIncome = (id: number) => {
    dispatch(deleteIncome(id));
  };

  const handleExportReport = () => {
    const doc = new jsPDF();

    // Add title
    doc.text("Income Report", 14, 10);

    // Prepare table data
    const tableColumn = ["Name", "Category", "Amount", "Date"];
    const tableRows = incomeRecords.map((income) => [
      income.name,
      income.category,
      `$${income.amount.toFixed(2)}`,
      income.date,
    ]);

    // Add table to PDF
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    // Save the PDF
    doc.save("income_report.pdf");
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="red">{error}</Text>;
  if (incomeRecords.length === 0)
    return (
      <>
        <Text>No income records found.</Text>
        <Button color="green" onClick={open}>
          Add Income
        </Button>
        {/* Modal for adding income */}
        <Modal opened={opened} onClose={close} title="Add Income">
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
            <Button onClick={handleAddIncome}>Submit</Button>
          </Group>
        </Modal>
      </>
    );

  const allIncomeRecords = incomeRecords.map((income, index) => (
    <Table.Tr key={income.id}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{income.name}</Table.Td>
      <Table.Td>{income.category}</Table.Td>
      <Table.Td>${income.amount.toFixed(2)}</Table.Td>
      <Table.Td>{income.date}</Table.Td>
      <Table.Td>
        <Group>
          <ActionIcon color="red" onClick={() => handleDeleteIncome(income.id)}>
            <IconDelete />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container ml={10}>
      <Text size="xl" fw={700} my="md">
        Income Page
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
        <Table.Tbody>{allIncomeRecords}</Table.Tbody>
      </Table>

      <Text mb={10}>Total Income: ${totalIncome.toFixed(2)}</Text>
      <Group>
        <Button color="green" onClick={open}>
          Add Income
        </Button>
        <Button color="blue" onClick={handleExportReport}>
          Export PDF
        </Button>
      </Group>
      {/* Modal for adding income */}
      <Modal opened={opened} onClose={close} title="Add Income">
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
          <Button onClick={handleAddIncome}>Submit</Button>
        </Group>
      </Modal>
    </Container>
  );
};

export default IncomePage;
