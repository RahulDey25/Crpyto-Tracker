import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';
import { styled } from '@mui/material';

// Define styles for the div element
const StyledDiv = styled('div')({
  backgroundColor: '#14161a',
  color: "white",
  minHeight: "100vh",
  

});

function App() {
  return (
    <BrowserRouter>
      <StyledDiv>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </StyledDiv>
    </BrowserRouter>
  );
}

export default App;
