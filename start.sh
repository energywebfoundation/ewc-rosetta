#!/bin/bash

wait_for_node() {
  ETH_SYNCING=$(curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' $WEB3_PROVIDER_URL -H 'Content-Type: application/json')
  RESULT=$(echo "$ETH_SYNCING" | jq -r .result)

  if [ "$RESULT" == "false" ]; then
      echo "Node is ready to start accepting traffic"
      exit 0
  elif [ "$MODE" = "offline" ]; then
      echo "Node in offline mode"
      exit 0
  else
      echo "Node is not ready to start accepting traffic"
      sleep 1
      wait_for_node
  fi
}

if [ "$MODE" = "offline" ]; then
    mode="offline"
else
    mode="active"
fi

if [ "$NETWORK" = "mainnet" ]; then
    chain="EnergyWebChain.json"
else
    chain="Volta.json"
fi

openethereum --config /parity/config/parity.toml --chain /parity/config/$chain --mode $mode &
wait_for_node &
process_id=$!
wait -n $process_id
forever --minUptime 5000 --spinSleepTime 3000 /bin/ewc-rosetta/dist/main.js
