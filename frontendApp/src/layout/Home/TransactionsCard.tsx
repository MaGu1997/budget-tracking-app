import React from "react";
import { ActionIcon, Card, Group, Menu, Table, Text } from "@mantine/core";
import IconMenu from "../../assets/icons/IconMenu";
import IconPdf from "../../assets/icons/IconPdf";
import IconEye from "../../assets/icons/IconEye";
import IconDelete from "../../assets/icons/IconDelete";

type Transaction = {
  name: string;
  type: string; // "expense" or "income"
  category: string;
  amount: number;
  date: string;
};

type TransactionsCardProps = {
  transactions: Transaction[];
};

const TransactionsCard: React.FC<TransactionsCardProps> = ({
  transactions,
}) => {
  const allTransactions = transactions.map((transaction, index) => (
    <Table.Tr key={index}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{transaction.name}</Table.Td>
      <Table.Td c={transaction.type === "expense" ? "red" : "green"}>
        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
      </Table.Td>
      <Table.Td>{transaction.category}</Table.Td>
      <Table.Td>
        {transaction.type === "expense" ? "-" : "+"}$
        {transaction.amount.toFixed(2)}
      </Table.Td>
      <Table.Td>{transaction.date}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Card withBorder shadow="sm" radius="md">
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Text fw={500}>Transactions</Text>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <IconMenu />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<IconPdf />}>Download csv</Menu.Item>
              <Menu.Item leftSection={<IconEye />}>Show all</Menu.Item>
              <Menu.Item leftSection={<IconDelete />} color="red">
                Delete all
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>
      <Table>
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
    </Card>
  );
};

export default TransactionsCard;
