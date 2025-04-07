// // Will show the Category spent histogram
// // Will show the day-to-day spending + income combimed double histogram

// import React from "react";
// import { Card, Text } from "@mantine/core";
// import { Bar } from "react-chartjs-2";

// const MonthlyReport: React.FC = () => {
//   const categoryData = {
//     labels: ["Food", "Transport", "Rent"],
//     datasets: [
//       {
//         label: "Category Spending",
//         data: [200, 150, 1000],
//         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//       },
//     ],
//   };

//   const dayToDayData = {
//     labels: ["Day 1", "Day 2", "Day 3"],
//     datasets: [
//       {
//         label: "Spending",
//         data: [50, 100, 75],
//         backgroundColor: "#FF6384",
//       },
//       {
//         label: "Income",
//         data: [1000, 500, 700],
//         backgroundColor: "#36A2EB",
//       },
//     ],
//   };

//   return (
//     <Card shadow="sm" padding="lg" radius="md" withBorder>
//       <Text size="lg" mb="md">
//         Monthly Report
//       </Text>
//       <Bar data={categoryData} />
//       <Bar data={dayToDayData} />
//     </Card>
//   );
// };

// export default MonthlyReport;
