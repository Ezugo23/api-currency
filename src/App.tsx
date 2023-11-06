import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';

export type Crypto = {
  
ath
: 
number
atl
: 
number
atl_change_percentage
: 
51701.64195
atl_date
: 
"2013-07-06T00:00:00.000Z"
circulating_supply
: 
19534900
current_price
: 
number
fully_diluted_valuation
: 
737548714427
high_24h
: 
number
id
: 
string
image
: 
"https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
last_updated
: 
"2023-11-06T15:00:07.851Z"
low_24h
: 
number
market_cap
: 
686092399117
market_cap_change_24h
: 
4351883268
market_cap_change_percentage_24h
: 
0.63835
market_cap_rank
: 
1
max_supply
: 
21000000
name
: 
string
price_change_24h
: 
274.55
price_change_percentage_24h
: 
0.78598
roi
: 
null
symbol
: 
string
total_supply
: 
21000000
total_volume
: 
11896871338
}


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
    return <p>{crypto.name + ' $' + crypto.current_price}</p>
 }) : null} </div>;
}

export default App;
