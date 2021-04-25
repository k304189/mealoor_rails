import { extendTheme } from "@chakra-ui/react";

const systemTheme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "#7FDC96",
        color: "gray.800"
      },
      header: {
        backgroundColor: "#FCFDFE",
        color: "#7FDC96",
      },
      article: {
        backgroundColor: "#FCFDFE",
        borderRadius: "md",
        shadow: "md"
      }
    }
  }
});
export default systemTheme;
