import { extendTheme, theme } from "@chakra-ui/react";

export default extendTheme({
  styles: {
    global: {
      "*": {
        fontFamily: "'Kumbh Sans', sans-serif",
      },
    },
  },
  colors: {
    primary: "hsl(26, 100%, 55%)",
    secondary: "hsl(25, 100%, 94%)",
    varkBlue: "hsl(220, 13%, 13%)",
    darkGrayishBlue: "hsl(219, 9%, 45%)",
    grayishBlue: "hsl(220, 14%, 75%)",
    lightGrayishBlue: "hsl(223, 64%, 98%)",
    white: "hsl(0, 0%, 100%)",
    black: "hsl(0, 0%, 0%)",
    blackish: "hsl(0, 0%, 75%)",
  },
});
