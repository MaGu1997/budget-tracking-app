// Will show options
/*
1. New expense
2. New income
3. Export report (which will take into consideration the current date range selected or set 1 month to default)
*/

import React from "react";
import { Card, Button, Group, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const QuickAccess: React.FC = () => {
  const navigate = useNavigate();

  const handleNewExpense = () => {
    navigate("/expenses", { state: { openModal: true } });
  };

  const handleNewIncome = () => {
    navigate("/income", { state: { openModal: true } });
  };

  const handleExportReport = () => {
    navigate("/export");
  };

  return (
    <Card withBorder shadow="sm" radius="md" p={20} mb={20} mt={20}>
      <Card.Section withBorder inheritPadding py={10} mb={10}>
        <Text fw={500}>Quick Access</Text>
      </Card.Section>
      <Group>
        <Button variant="gradient" onClick={handleNewExpense}>
          New Expense
        </Button>
        <Button variant="gradient" onClick={handleNewIncome}>
          New Income
        </Button>
        <Button variant="gradient" onClick={handleExportReport}>
          Export Report
        </Button>
      </Group>
    </Card>
  );
};

export default QuickAccess;
