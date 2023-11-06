import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';
import CryptoCurrency from './component/CryptoSummary';
import {Crypto} from './component/Crypto'


function App() {
  const [crypto, setCrypto] = useState<Crypto[] | null>();
  useEffect(() => {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
    axios.get(url)
    .then((response)=>{
       setCrypto(response.data)
    });
  }, []);
 
 
 return <div className="App"> {crypto ? crypto.map((crypto) => {
   return <CryptoCurrency crypto={crypto}/>
 }) : null} </div>;
}

export default App;
