import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppShell, Text } from "@mantine/core";
import NavigationLink from "../layout/Navigation/NavigationLink";
import HomePage from "../layout/Home/HomePage";
import ExpensesPage from "../layout/Expenses/ExpensesPage";
import IncomePage from "../layout/Income/IncomePage";
import ExportPage from "../layout/Export/ExportPage";
import Footer from "../layout/Footer/Footer";

const AppRouter: React.FC = () => {
  return (
    <>
      <Router>
        <AppShell
          navbar={{
            width: 200,
            breakpoint: "mantine-breakpoint-xs",
          }}
          styles={{
            main: {
              flexGrow: 1, // Allow the main section to grow and take up remaining space
              width: "100%", // Ensure it takes up 100% of the remaining width
            },
          }}
        >
          <AppShell header={{ height: { base: 30, sm: 40, lg: 50 } }}>
            <AppShell.Header>
              <Text
                fw={700}
                size="xl"
                ta={"center"}
                variant="gradient"
                gradient={{ from: "red", to: "pink", deg: 198 }}
              >
                Budget Tracking Application
              </Text>
            </AppShell.Header>
          </AppShell>
          <AppShell.Navbar p="md">
            <NavigationLink />
            <AppShell.Footer>
              <Footer />
            </AppShell.Footer>
          </AppShell.Navbar>
          <AppShell.Main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/expenses" element={<ExpensesPage />} />
              <Route path="/income" element={<IncomePage />} />
              <Route path="/export" element={<ExportPage />} />
            </Routes>
          </AppShell.Main>
        </AppShell>
      </Router>
    </>
  );
};

export default AppRouter;
