import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import {
  Container,
  LinearProgress,
  Pagination,
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
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "./Banner/Carousel";

const StyledRow = styled(TableRow)({
  flex: 1,
  color: "gold",
  fontFamily: "Montserrat",
  fontWeight: "bold",
  backgroundColor: "#16171a",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#131111",
  },
});

const StyledPagination = styled(Pagination)({
  "& .MuiPaginationItem-root": {
    color: "gold",
  },
});

const CoinsTable = () => {
  // states for updating searching
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // importing currency from CryptoContext to perform actions
  const { currency, symbol, coins, loading, fetchCoins } = CryptoState();

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
                <TableRow style={{ border: "none" }}>
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

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;

                    return (
                      <StyledRow
                        onClick={() => navigateTo(`/coins/${row.id}`)}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ display: "flex", gap: 15 }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />

                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>

                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>

                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          &nbsp;M
                        </TableCell>
                      </StyledRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <StyledPagination
          style={{
            padding: "20",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          count={(handleSearch()?.length / 10).toFixed(0)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
