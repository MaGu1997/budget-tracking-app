// Similar to the Pending cards in image
// Will include an icon, category and total amount for that category

import React from "react";
import { ActionIcon, Card, Group, Menu, Table, Text } from "@mantine/core";
import IconMenu from "../../assets/icons/IconMenu";
import IconPdf from "../../assets/icons/IconPdf";
import IconEye from "../../assets/icons/IconEye";
import IconDelete from "../../assets/icons/IconDelete";

type Category = {
  name: string;
  totalIncome: number;
  totalExpense: number;
};

type CategoriesCardProps = {
  categories: Category[];
};

const CategoriesCard: React.FC<CategoriesCardProps> = ({ categories }) => {
  const allCategories = categories.map((category, index) => (
    <Table.Tr key={index}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{category.name}</Table.Td>
      <Table.Td>${category.totalIncome.toFixed(2)}</Table.Td>
      <Table.Td>${category.totalExpense.toFixed(2)}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Card withBorder shadow="sm" radius="md">
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Text fw={500}>Categories</Text>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <IconMenu />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<IconPdf />}>Download PDF</Menu.Item>
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
            <Table.Th>Category</Table.Th>
            <Table.Th>Total Income</Table.Th>
            <Table.Th>Total Expense</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{allCategories}</Table.Tbody>
      </Table>
    </Card>
  );
};

export default CategoriesCard;
