interface EthTraceAction {
  callType?: string,
  from: string,
  gas: BigInt,
  input: BigInt,
  to: string,
  value: string,
  address: string,
  balance?: string,
  refundAddress?: string
}

interface EthTraceResult {
  address: string,
  gasUsed: string,
  output: string,
  code: string,
}

export interface EthTrace {
  action: EthTraceAction,
  result: EthTraceResult,
  blockHash: string,
  blockNumber: number,
  error: string,
  subtraces: number,
  traceAddress: string[],
  transactionHash: string,
  transactionPosition: 0,
  type: string
}
export interface BlockWithTransactions {
  author: string;
  baseFeePerGas: string;
  difficulty: string;
  extraData: string;
  gasLimit: string;
  gasUsed: string;
  hash: string;
  logsBloom: string;
  miner: string;
  number: string;
  parentHash: string;
  receiptsRoot: string;
  sealFields: string[];
  sha3Uncles: string;
  signature: string;
  size: string;
  stateRoot: string;
  step: string;
  timestamp: string;
  totalDifficulty: string;
  transactions: string[];
  transactionsRoot: string;
  uncles: any[];
}

export const CALL = 'CALL';
export const CALLCODE = 'CALLCODE';
export const DELEGATECALL = 'DELEGATECALL';
export const STATICCALL = 'STATICCALL'

export const CREATE = 'CREATE'
export const CREATE2 = 'CREATE2'

export const CallType = new Set([CALL, CALLCODE, DELEGATECALL, STATICCALL]);

export const CreateType = new Set([CREATE, CREATE2]);

export const TransferCallType = new Set([CALL, CALLCODE]);
