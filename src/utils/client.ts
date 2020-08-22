import { ethers } from "ethers";

export const inOfflineMode = () => process.env.MODE === "offline";

export const getRPCProvider = () =>
  inOfflineMode()
    ? null
    : new ethers.providers.JsonRpcProvider(process.env.WEB3_PROVIDER_URL);
