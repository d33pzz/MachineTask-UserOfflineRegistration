import { BCKCLRDRK, BCKCLRLGT, BTNCLRDRK, CRDCLRDRK, PUREBLACK, PUREWHITE, TXTCLRDRK, TXtCLRLGT } from "./colors";

export const CUSTLIGHTTHEME = {
  dark: false,
  colors: {
    background: BCKCLRLGT,
    text: TXtCLRLGT,
    buttonBackground: PUREBLACK,
    buttonText: PUREWHITE,
    card: PUREWHITE, // For containers
  },
};

export const CUSTDARKTHEME = {
  dark: true,
  colors: {
    background: BCKCLRDRK,
    text: TXTCLRDRK,
    buttonBackground: BTNCLRDRK,
    buttonText: PUREWHITE,
    card: CRDCLRDRK, // For containers
  },
};
