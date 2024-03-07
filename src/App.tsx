import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState<number | null>(null);
  const [currency, setCurrency] = useState<string>('BTC');

  useEffect(() => {
    fetchBitcoinPrice();
  }, [currency]); // Update price when currency changes

  const fetchBitcoinPrice = async () => {
    try {
      const response = await axios.get(`https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`);
      setBitcoinPrice(response.data.bpi[currency].rate_float);
    } catch (error) {
      console.error('Error fetching Bitcoin price:', error);
    }
  };

  const updatePrice = () => {
    fetchBitcoinPrice();
  };

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value);
  };

  return (
    <div className="App">
      <h1>Bitcoin Price</h1>
      <p>Current price: {bitcoinPrice ? `${bitcoinPrice}` : 'Loading...'}</p>
      <button onClick={updatePrice}>Update Price</button>
      <select value={currency} onChange={handleCurrencyChange}>
        <option value="BTC">BTC</option>
        <option value="ETH">ETH</option>
      </select>
    </div>
  );
  
};

export default App;
