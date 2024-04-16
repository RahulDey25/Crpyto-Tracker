import { Container, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material";
import Carousel from "./Carousel";

// Material UI stylings
const StyledBanner = styled("div")({
  backgroundImage: "url(./banner2.jpg)",
});

const StyledImage = styled(Container)({
  height: 400,
  display: "flex",
  flexDirection: "column",
  paddingTop: 25,
  justifyContent: "space-around",
});

const StyledTagline = styled("div")({
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center"
});

const Banner = () => {
  return (
    <StyledBanner>
      <StyledImage>
        <StyledTagline>
            <Typography
            variant="h2"
            style={{
                fontWeight: "bold",
                marginBottom: 15,
                fontFamily: "Montserrate",
            }}>
                Crypto Tracker
            </Typography>

            <Typography
            variant="subtitle2"
            style={{
                color: "darkgrey",
                textTransform: "capitalize",
                fontFamily: "Montserrate",
            }}>
                Explore the details about your favorite crypto currency
            </Typography>
        </StyledTagline>
        <Carousel />
      </StyledImage>
    </StyledBanner>
  );
};

export default Banner;
