import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';
import CryptoSummary from './component/CryptoSummary'
import {Crypto} from './component/Crypto';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import type {ChartData} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);



function App() {
  const [crypto, setCrypto] = useState<Crypto[] | null>();
  const [selected, setSelected] = useState<Crypto[]>([]);
  const [data, setData] = useState<ChartData<'pie'>>();
 
  useEffect(() => {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
    axios.get(url)
    .then((response)=>{
       setCrypto(response.data)
    });
  }, []);

  useEffect(() => {
     if(selected.length === 0) return
     setData({ labels: selected.map((s) => s.name),
     datasets: [
       {
         label: '# of Votes',
         data: selected.map((s) => s.owned * s.current_price),
         backgroundColor: [
           'rgba(255, 99, 132, 0.2)',
           'rgba(54, 162, 235, 0.2)',
           'rgba(255, 206, 86, 0.2)',
           'rgba(75, 192, 192, 0.2)',
           'rgba(153, 102, 255, 0.2)',
           'rgba(255, 159, 64, 0.2)',
         ],
         borderColor: [
           'rgba(255, 99, 132, 1)',
           'rgba(54, 162, 235, 1)',
           'rgba(255, 206, 86, 1)',
           'rgba(75, 192, 192, 1)',
           'rgba(153, 102, 255, 1)',
           'rgba(255, 159, 64, 1)',
         ],
         borderWidth: 1,
       },
     ],
   });
  }, [selected]);

  function updateOwned(crypto: Crypto, amount: number) {
     let temp = [...selected];
     let tempObj = temp.find((c) => c.id === crypto.id)
      if(tempObj){
        tempObj.owned = amount;
        setSelected(temp)
      }
  }
 
 return <> <div className="App">
  <select onChange={(e) => {
    const c = crypto?.find((x) => x.id === e.target.value) as Crypto
    setSelected([...selected, c]);

  }}
  defaultValue="default"
  >
    <option value='default'>Choose an Option</option>
   {crypto ? crypto.map((crypto) => {
  return <option key={crypto.id} value={crypto.id}>{crypto.name}</option>
 }) : null} 
 </select>

 </div>
 {selected.map((s) => {return <CryptoSummary crypto={s} updateOwned={updateOwned}/>})}
 {data ?<div> <Pie data={data}/></div> : null}
 {selected ? 'Your Portfolio is worth: $' + selected.map((s) => {
  if(isNaN(s.owned)) {
    return 0;
  }
      return s.current_price * s.owned
 }).reduce((prev, current) => {
  return prev + current;
 }, 0).toLocaleString(undefined, {
       minimumFractionDigits: 2, maximumFractionDigits: 2
 })
  : null}
 </>
}

export default App;
