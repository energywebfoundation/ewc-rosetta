FROM ubuntu:20.04 as base

ENV DEBIAN_FRONTEND=noninteractive

RUN apt update && apt install -y build-essential curl jq git cmake libudev-dev pkg-config file make perl yasm gnupg wget

RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
RUN curl -sL https://deb.nodesource.com/setup_14.x  | bash -
RUN apt-get -y install nodejs

#OE

FROM base as builder
RUN git clone --branch v3.3.4 --depth 1 https://github.com/openethereum/openethereum

WORKDIR /openethereum
RUN wget https://raw.githubusercontent.com/energywebfoundation/ewf-chainspec/master/EnergyWebChain.json
RUN wget https://raw.githubusercontent.com/energywebfoundation/ewf-chainspec/master/Volta.json

RUN . ~/.cargo/env && cargo build --release --features final && strip target/release/openethereum

WORKDIR /
RUN git clone https://github.com/energywebfoundation/ewc-rosetta.git

RUN npm i -g yarn

WORKDIR /ewc-rosetta
RUN yarn --silent
RUN yarn build

FROM base as release

ENV API_SPEC_VERSION=0.1
ENV REWARD_CONTRACT_ADDRESS=0x1204700000000000000000000000000000000002
ENV BLOCKCHAIN=ewc

COPY --from=builder /openethereum/target/release/openethereum bin/openethereum
RUN mkdir -p /parity/config
COPY --from=builder /openethereum/EnergyWebChain.json parity/config/EnergyWebChain.json
COPY --from=builder /openethereum/Volta.json parity/config/Volta.json
COPY --from=builder ewc-rosetta/configs/OE/parity.toml parity/config/parity.toml

RUN mkdir /bin/ewc-rosetta

COPY --from=builder ewc-rosetta/dist bin/ewc-rosetta/dist
COPY --from=builder ewc-rosetta/node_modules bin/ewc-rosetta/node_modules

RUN npm i -g forever

COPY --from=builder ewc-rosetta/start.sh /
RUN chmod +x /start.sh

EXPOSE 8545
EXPOSE 8080

CMD ["/start.sh"]
