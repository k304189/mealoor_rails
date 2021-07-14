import { extendTheme } from "@chakra-ui/react";
import top from "../assets/top.jpg";

const baseColor = "#7FDC96";
const mainColor = "#FCFDFE";
const accentColor = "#FF6D62";
const headerColor = "#119B15";

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
const onlyContentHeight = {
  base: `calc(100% - ${headerHeight.base} - ${mainChildMargin.base})`,
  md: `calc(100% - ${headerHeight.md} - ${mainChildMargin.md})`,
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
        color: headerColor,
        position: "fixed",
        zIndex: "1",
        height: headerHeight,
        width: "100%",
        ".loginPop": {
          color: "#000000",
        },
        ".logo": {
          height: headerHeight,
        },
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
          height: titleHeight,
          borderLeftWidth: "10px",
          borderLeftStype: "solid",
          lineHeight: titleHeight,
          fontWeight: "normal",
          paddingLeft: "10px",
          marginTop: mainChildMargin,
        },
        ".contents": {
          marginTop: mainChildMargin,
          width: "100%",
          height: contentHeight,
        },
        ".onlyContents": {
          marginTop: mainChildMargin,
          width: "100%",
          height: onlyContentHeight,
        },
      },
      article: {
        backgroundColor: mainColor,
        borderRadius: "md",
        shadow: "md",
        padding: "16px",
      },
      ".sectionTitle": {
        borderLeft: `5px solid ${baseColor}`,
        paddingLeft: "8px",
        marginTop: "12px",
        marginBottom: "12px",
      },
      ".HavingStockTable": {
        ".passedLimitRow": {
          backgroundColor: "#EDF2F7",
          ".limitColumn": {
            fontWeight: "bold",
            color: "#4A5568",
          },
        },
        ".nearlyLimitRow": {
          backgroundColor: "#FED7D7",
          ".limitColumn": {
            fontWeight: "bold",
            color: "#E53E3E",
          },
        },
      },
      ".calendar": {
        ".sunday": {
          backgroundColor: "#FFD6D6",
        },
        ".saturday": {
          backgroundColor: "#D6EAFF",
        },
        ".notTargetMonth": {
          backgroundColor: "#F3F3F3",
        },
      },
      ".defaultSection": {
        backgroundColor: mainColor,
        borderLeftColor: accentColor,
      },
      ".dataSection": {
        backgroundColor: "#FFF1AB",
        color: "#974407",
        borderLeftColor: "#FFD700",
      },
      ".stockSection": {
        backgroundColor: "#FFCCC8",
        color: "#730800",
        borderLeftColor: accentColor,
      },
      ".adminSection": {
        backgroundColor: "#2A4365",
        color: mainColor,
        borderLeftColor: "#BEE3F8",
      },
      ".pagination": {
        display: "flex",
        listStyle: "none",
        li: {
          margin: "0",
          padding: "0",
          borderRadius: "5px",
          width: "24px",
          height: "24px",
          _hover: pagenationColor,
          "&.selected": pagenationColor,
        },
        a: {
          display: "flex",
          margin: "0 2px",
          justifyContent: "center",
          alignItems: "center",
        },
      },
      ".top": {
        letterSpacing: "2px",
        backgroundImage: `url(${top})`,
        backgroundSize: "cover",
        position: "relative",
        ".white": {
          position: "absolute",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          height: "100%",
          width: "100%",
          top: 0,
          left: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          div: {
            textAlign: "center",
            h1: {
              fontSize: "32px",
            },
            img: {
              margin: "0 auto",
            },
            p: {
              fontSize: "24px",
              margin: "20px 0",
            },
          },
        },
      },
      ".http404": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        img: {
          height: "50%",
        },
        div: {
          textAlign: "center",
          merginLeft: "20px",
          h1: {
            fontSize: "64px",
            fontWeight: "bold",
          },
          h3: {
            fontSize: "32px",
            fontWeight: "bold",
          },
          p: {
            fontSize: "20px",
            margin: "20px 0",
          },
        },
      },
      ".withdraw": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        div: {
          textAlign: "center",
          h1: {
            fontSize: "64px",
            fontWeight: "bold",
          },
          p: {
            fontSize: "20px",
            margin: "20px 0",
          },
        },
      },
    },
  },
});
export default systemTheme;
