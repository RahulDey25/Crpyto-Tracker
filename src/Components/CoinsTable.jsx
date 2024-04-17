import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import {
  Container,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  styled,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StyledRow = styled(TableRow)({
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  });

const CoinsTable = () => {

    // states for updating coins, loading and searching
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");


  // importing currency from CryptoContext to perform actions
  const { currency } = CryptoState();


  // fetching with axios coins data to list coins
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };


  // useEffect to render fetchcoins everytime currency changes 
  useEffect(() => {
    fetchCoins();
  }, [currency]);


  // applying dark theme for text coloring to visible
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  // handleSearch function to search for the Crypto Currencies
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const navigateTo = useNavigate();

  return (
    <ThemeProvider theme={darkTheme}>
      {/*Adding CssBaseline inside of the ThemeProvider component will also enable dark mode for the app's background. */}
      <CssBaseline />{" "}
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Leading Cryptocurrencies by Market Cap
        </Typography>

        <TextField
          label="Search For Cryptocurrencies"
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow style={{ border: 'none' }}>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "left" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>{handleSearch().map((row) => {
                const profit = row.price_change_percentage_24h > 0;

                return (
                    <StyledRow
                    onClick={() => navigateTo(`/coins/${row.id}`)}
                    key={row.name}
                    >
                        <TableCell component='th' scope='row'
                        style={{display: 'flex', gap: 15, }}
                        >
                            <img 
                            src={row?.image}
                            alt={row.name}
                            height='50'
                            style={{marginBottom: 10}}
                             />

                             {/* more to add here vdo - 1:07 */}

                             
                        </TableCell>
                    </StyledRow>
                )
              })}</TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
