import { extendTheme } from "@chakra-ui/react";

const baseColor = "#7FDC96";
const mainColor = "#FCFDFE";
const accentColor = "#FF6D62";

const pagenationColor = {
  bg: baseColor,
  color: mainColor,
};
const headerHeight = {
  base: "28px",
  md: "48px",
};
const mainHeight = {
  base: `calc(100% - ${headerHeight.base})`,
  md: `calc(100% - ${headerHeight.md})`,
};
const titleHeight = {
  base: "24px",
  md: "40px",
};
const titleFontSize = {
  base: "12px",
  md: "20px",
};
const mainChildMargin = {
  base: "10px",
  md: "20px",
};
const contentHeight = {
  base: `calc(100% - ${headerHeight.base} - ${titleHeight.base} - ${mainChildMargin.base})`,
  md: `calc(100% - ${headerHeight.md} - ${titleHeight.md} - ${mainChildMargin.md})`,
};
const contentPadding = {
  base: "8px",
  md: "16px",
};

const systemTheme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: baseColor,
        color: "gray.800",
      },
      header: {
        backgroundColor: mainColor,
        color: baseColor,
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
        ".title": {
          fontSize: titleFontSize,
          backgroundColor: "#FFCCC8",
          color: "#730800",
          height: titleHeight,
          borderLeft: `10px solid ${accentColor}`,
          lineHeight: titleHeight,
          fontWeight: "normal",
          paddingLeft: "10px",
          marginTop: mainChildMargin,
        },
        ".contents": {
          marginTop: mainChildMargin,
          width: "100%",
          height: contentHeight,
          padding: contentPadding,
        },
      },
      article: {
        backgroundColor: mainColor,
        borderRadius: "md",
        shadow: "md",
        padding: "16px",
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
