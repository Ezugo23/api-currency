import {Crypto} from '../component/Crypto';

export type AppProps = {
   crypto: Crypto;
}

export default function  CryptoSummarry({crypto} : AppProps) {
  return <p>{crypto.name + ' $' + crypto.current_price}</p>
}