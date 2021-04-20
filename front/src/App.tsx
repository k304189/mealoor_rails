import { BrowserRouter } from "react-router-dom";
import { Button, ChakraProvider } from "@chakra-ui/react"

import systemTheme from "./theme/systemTheme";
import { Router } from "./router/Router"

function App() {
  return (
    <ChakraProvider theme={systemTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <Button colorScheme="teal">ボタン</Button>
    </ChakraProvider>
  );
}

export default App;
