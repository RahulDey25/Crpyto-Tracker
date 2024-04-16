import React from "react";
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

// Title styling
const StyledTitle = styled(Typography)({
  flex: 1,
  color: "gold",
  fontFamily: "Montserrat",
  fontWeight: "bold",
  cursor: "pointer",
});

const Header = () => {
  const navigateTo = useNavigate();
  

  // importing currency-symbol & state from CryptoContext.jsx file
  const { currency, setCurrency } = CryptoState();
  // console.log(currency)


  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
         <CssBaseline /> {/*Adding CssBaseline inside of the ThemeProvider component will also enable dark mode for the app's background. */}


      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <StyledTitle onClick={() => navigateTo("/")} variant="h6">
              Crypto Tracker
            </StyledTitle>

            <Select
              variant="outlined"
              style={{ width: 100, height: 40, marginRight: 15 }}
              value={currency} // Bind value to state variable
              onChange={(e) => setCurrency(e.target.value)} // Handle currency change
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
              {/* Add Other currencies and also make changes in CryptoContext.jsx */}

            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
