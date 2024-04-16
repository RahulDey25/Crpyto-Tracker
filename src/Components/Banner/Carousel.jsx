import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material';
import axios from 'axios';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

// Material UI stylings
const StyledCarousel = styled("div")({
    height: "50%",
    display: "flex",
    alignItems: "center",
  });
  const StyledCarouselItem = styled(Link)({
    display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
  });

const Carousel = () => {

    const [trending, setTrending] = useState([])

  const {currency} = CryptoState()
    const fetchTrendingCoins = async () => {
        const {data} = await axios.get(TrendingCoins(currency));
        setTrending(data);
    };
// console.log(trending)

    useEffect(()=> {
        fetchTrendingCoins();
    },[currency]);

    const items = trending.map((coin) => {
        return (
            <StyledCarouselItem to={`/coins.${coin.id}`}>
                <img 
                src={coin?.image}
                alt={coin.name}
                height="80"
                style={{marginBottom: 10}} />
                <span>
                    
                </span>
            </StyledCarouselItem>
        )
    })

    // For the responsiveness in the screens
    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

  return (
    <StyledCarousel>
      <AliceCarousel
      mouseTracking
      infinite
      autoPlayInterval={1000}
      animationDuration={1500}
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      autoPlay
      items={items} />
    </StyledCarousel>
  )
}

export default Carousel
