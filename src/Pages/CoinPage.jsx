import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import CoinInfo from "../Components/CoinInfo";
import { LinearProgress, Typography, styled } from "@mui/material";
import { numberWithCommas } from "../Components/Banner/Carousel";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  // Applied styling and media queries in a different way other than makeStyles/theme
  const StyledContainer = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    "@media (max-width: 960px)": {
      flexDirection: "column",
      alignItems: "center",
    },
  });

  const StyledSideBar = styled("div")({
    width: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
    "@media (max-width: 960px)": {
      width: "100%",
    },
  });

  const StyledHeading = styled(Typography)({
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  });

  const StyledDescription = styled(Typography)({
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  });

  const StyledMarketData = styled("div")({
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",

    "@media (max-width: 768px)": {
      flexDirection: "column",
      alignItems: "center",
    },

    "@media (max-width: 960px)": {
      display: "flex",
      justifyContent: "space-around",
    },

    "@media (max-width: 576px)": {
      alignItems: "start",
    },
  });

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <StyledContainer>
      <StyledSideBar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <StyledHeading variant="h3">{coin?.name}</StyledHeading>

        <StyledDescription variant="subtitle1">
          {/* The ?. is called the optional chaining operator. It's used to safely
          access properties of an object without causing an error if the object
          is null or undefined. */}
          {/* The under stated statement will show 2 sentences from the whole data didnot wrapped coin?.des... in ReactHtmlParser as it parsed automatically here */}
          {coin?.description.en.split(". ")[0]}.
          {coin?.description.en.split(". ")[1]}.
        </StyledDescription>

        <StyledMarketData>
          <span style={{ display: "flex" }}>
            <StyledHeading variant="h5">Rank:</StyledHeading>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <StyledHeading variant="h5">Current Price:</StyledHeading>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <StyledHeading variant="h5">Market Cap:</StyledHeading>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}{" "}
              M
            </Typography>
          </span>
        </StyledMarketData>
      </StyledSideBar>

      {/* chart  */}

      <CoinInfo coin={coin} />
    </StyledContainer>
  );
};

export default CoinPage;
