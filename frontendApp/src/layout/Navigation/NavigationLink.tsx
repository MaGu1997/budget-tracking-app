// Will have the following links
/*
1. Homepage
2. Expenses page {will show all expenses along with category and date}
3. Income page {will show all income along with category and date}
4. Export page {Will show a table that will export all the expenses and reports to a pdf on one click}
*/

import React from "react";
import { NavLink } from "@mantine/core";

import IconHome from "../../assets/icons/IconHome";
import IconWallet from "../../assets/icons/IconWallet";
import IconMoneybag from "../../assets/icons/IconMoneybag";
import IconFileExport from "../../assets/icons/IconFileExport";
import { useLocation } from "react-router-dom";
// import styles from "./NavigationLink.module.css";

const NavigationLink: React.FC = () => {
  const location = useLocation(); // Get the current route

  return (
    <>
      <NavLink
        href="/"
        label="Homepage"
        leftSection={<IconHome />}
        active={location.pathname === "/"}
      />
      <NavLink
        href="/expenses"
        label="Expenses"
        leftSection={<IconWallet />}
        active={location.pathname === "/expenses"}
      />
      <NavLink
        href="/income"
        label="Income"
        leftSection={<IconMoneybag />}
        active={location.pathname === "/income"}
      />
      <NavLink
        href="/export"
        label="Export"
        leftSection={<IconFileExport />}
        active={location.pathname === "/export"}
      />
    </>
  );
};

export default NavigationLink;
