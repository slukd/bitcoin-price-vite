import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState<number | null>(null);
  const [ethereumPrice, setEthereumPrice] = useState<number | null>(null);
  const [currency, setCurrency] = useState<string>('BTC');

  useEffect(() => {
    fetchBitcoinPrice(Date.now());
    fetchEthereumPrice(Date.now());
  }, [currency]);

  const fetchBitcoinPrice = async (timestamp: number) => {
    try {
      const response = await axios.get(`https://api.coindesk.com/v1/bpi/currentprice.json?timestamp=${timestamp}`);
      const bitcoinPrice = response.data?.bpi?.USD?.rate_float;
      if (bitcoinPrice !== undefined) {
        setBitcoinPrice(bitcoinPrice);
      } else {
        console.error('Error: Bitcoin price data not available');
        setBitcoinPrice(null);
      }
    } catch (error) {
      console.error('Error fetching Bitcoin price:', error);
      setBitcoinPrice(null);
    }
  };

  const fetchEthereumPrice = async (timestamp: number) => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&timestamp=${timestamp}`);
      const ethereumPrice = response.data?.ethereum?.usd;
      if (ethereumPrice !== undefined) {
        setEthereumPrice(ethereumPrice);
      } else {
        console.error('Error: Ethereum price data not available');
        setEthereumPrice(null);
      }
    } catch (error) {
      console.error('Error fetching Ethereum price:', error);
      setEthereumPrice(null);
    }
  };

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value);
  };

  const updatePrice = () => {
    fetchBitcoinPrice(Date.now());
    fetchEthereumPrice(Date.now());
  };

  return (
    <div className="App">
      <h1>{currency === 'BTC' ? 'Bitcoin' : 'Ethereum'} Price</h1>
      <p>Current {currency === 'BTC' ? 'Bitcoin' : 'Ethereum'} price: 
        {currency === 'BTC' ? 
          (bitcoinPrice !== null ? `$${bitcoinPrice.toFixed(2)}` : 'Loading...') : 
          (ethereumPrice !== null ? `$${ethereumPrice.toFixed(2)}` : 'Loading...')
        }
      </p>
      <button onClick={updatePrice}>Update Price</button>
      <select value={currency} onChange={handleCurrencyChange}>
        <option value="BTC">BTC</option>
        <option value="ETH">ETH</option>
      </select>
    </div>
  );
};

export default App;
