import { extendTheme } from "@chakra-ui/react";

const pagenationColor = {
  bg: "#7FDC96",
  color: "#FCFDFE",
};
const headerHeight = {
  base: "28px",
  md: "48px",
};
const mainHeight = {
  base: `calc(100% - ${headerHeight.base})`,
  md: `calc(100% - ${headerHeight.md})`,
};

const systemTheme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "#7FDC96",
        color: "gray.800",
      },
      header: {
        backgroundColor: "#FCFDFE",
        color: "#7FDC96",
        position: "fixed",
        zIndex: "1",
        height: headerHeight,
        width: "100%",
      },
      ".main": {
        position: "fixed",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        top: headerHeight,
        height: mainHeight,
      },
      article: {
        backgroundColor: "#FCFDFE",
        borderRadius: "md",
        shadow: "md",
      },
      ".pagination": {
        display: "flex",
        listStyle: "none",
        li: {
          margin: "0",
          padding: "0",
          borderRadius: "10px",
          _hover: pagenationColor,
          "&.selected": pagenationColor,
        },
        a: {
          display: "flex",
          margin: "0 2px",
          width: "32px",
          height: "32px",
          justifyContent: "center",
          alignItems: "center",
        },
      },
    },
  },
});
export default systemTheme;
