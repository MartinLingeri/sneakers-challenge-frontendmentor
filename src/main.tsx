import React from "react";
import { ChakraProvider} from "@chakra-ui/react";
import ReactDOM from "react-dom/client";

import App from "./App";
import theme from "./theme";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement!);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
