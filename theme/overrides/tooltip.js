import { cssVar } from "@chakra-ui/theme-tools";

const $arrowBg = cssVar("popper-arrow-bg");

export const Tooltip = {
  baseStyle: {
    background: "white",
    [$arrowBg.variable]: "white",
    borderRadius: "12px",
    boxShadow: "0px 10px 20px rgba(136, 120, 172, 0.2)",
    color: "black",
    fontFamily: "Satoshi",
    fontSize: "12px",
    fontWeight: 400,
    padding: "16px",
  },
  variants: {
    black: {
      background: "black",
      [$arrowBg.variable]: "black",
      borderRadius: "100px",
      boxShadow: "0px 10px 20px rgba(136, 120, 172, 0.2)",
      color: "white",
      fontFamily: "Satoshi",
      fontSize: "12px",
      fontWeight: 700,
      padding: "8px 16px",
    },
  },
};
