import { ethers } from "ethers";

export const getRPCProvider = () =>
  new ethers.providers.JsonRpcProvider(process.env.WEB3_PROVIDER_URL);
