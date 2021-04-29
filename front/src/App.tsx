import { VFC } from "react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import systemTheme from "./theme/systemTheme";
import { Router } from "./router/Router";

const App: VFC = () => {
  return (
    <ChakraProvider theme={systemTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
