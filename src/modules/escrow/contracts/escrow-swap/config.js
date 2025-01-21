import { enviroment, enviromentTypes } from "@/lib/constants";

const addressProd = "0x92374eAe47585db42A8D7779B2504B776c7cE0aE"; // mainnet

const addressDev = "0xEed23D2cf6202125dB63A1B894ce08449F0870eE"; //testnet
// dev old - 0x0736f5D970C3f3a312dAf23eb410F276E948862C

const address =
  enviroment === enviromentTypes.production ? addressProd : addressDev;

const config = { address };

export default config;
