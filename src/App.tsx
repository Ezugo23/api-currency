import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';
import CryptoSummary from './component/CryptoSummary'
import {Crypto} from './component/Crypto';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type {ChartData} from 'chart.js';
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



function App() {
  const [crypto, setCrypto] = useState<Crypto[] | null>();
  const [selected, setSelected] = useState<Crypto | null>();

  const [range, setRange] = useState<number>(30);

  const [data, setData] = useState<ChartData<'line'>>();
  const [options, setOptions] = useState<ChartOptions<'line'>>({
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  });
  useEffect(() => {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
    axios.get(url)
    .then((response)=>{
       setCrypto(response.data)
    });
  }, []);
 
  useEffect(() => {
    if (selected) {
    axios.get(`https://api.coingecko.com/api/v3/coins/${selected?.id}/market_chart?vs_currency=usd&days=${range}&${range === 1 ?  'interval=hourly' : `interval=daily`}`)
    .then((response) => {
      console.log(response.data)
      setData({
        labels: response.data.prices.map((price: number[]) => {return moment.unix(price[0] / 1000).format(range === 1 ? 'HH-MM' : 'MM-DD');
        }),

        datasets: [
          {
            label: 'Dataset 1',
            data: response.data.prices.map((price: number[]) => {return price[1]}),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      });
      setOptions({
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: `${selected?.name} Price  Over Last` + range + (range === 1 ? 'Day.' : 'Days'),
          },
        },
      })
    })
    .catch((error) => {
      console.error('Request error:', error); // Log the request error
    });
  }
  }, [selected, range])
 
 return <> <div className="App">
  <select onChange={(e) => {
    const c = crypto?.find((x) => x.id === e.target.value)
    setSelected(c);

  }}
  defaultValue="default"
  >
    <option value='default'>Choose an Option</option>
   {crypto ? crypto.map((crypto) => {
  return <option key={crypto.id} value={crypto.id}>{crypto.name}</option>
 }) : null} 
 </select>

<select onChange={(e) => {
   setRange(parseInt(e.target.value))
}}>
  <option value={30}>30 days</option>
  <option value={7}>7 days</option>
</select>

 </div>
 {selected ?<CryptoSummary crypto={selected}/> : null}
 {data ?<div> <Line options={options} data={data}/></div> : null}
 </>
}

export default App;
