import { extendTheme } from "@chakra-ui/react"

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: "#ffebee",
      100: "#ffcdd2",
      200: "#ef9a9a",
      300: "#e57373",
      400: "#ef5350",
      500: "#f44336",
      600: "#e53935",
      700: "#d32f2f",
      800: "#c62828",
      900: "#b71c1c",
    },
  },
  fonts: {
    body: "'Open Sans', sans-serif",
    heading: "'Poppins', sans-serif",
  },
  styles: {
    global: props => ({
      body: {
        color: props.colorMode === "dark" ? "#white" : "white",
        bg: props.colorMode === "dark" ? "#white" : "#65fbd7",
      },
    }),
  },
})

export default theme
