#!/bin/bash

process="rosetta"

if [ "$1" = "openethereum" ]; then
    process="openethereum"
else
    process="rosetta"
fi

if [ "$MODE" = "offline" ]; then
    mode="offline"
else
    mode="active"
fi

if [ "$process" = "openethereum" ]; then
    openethereum --config /parity/config/parity.toml --mode $mode
else
    node /bin/ewc-rosetta/dist/main.js
fi

