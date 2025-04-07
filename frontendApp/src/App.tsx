import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AppRouter from "./services/router";
import "@mantine/core/styles.css";
import { theme } from "./theme";

function App() {
  return (
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <AppRouter />
      </MantineProvider>
    </Provider>
  );
}

export default App;
