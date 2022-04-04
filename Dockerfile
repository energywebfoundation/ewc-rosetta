FROM ubuntu:18.04 as base

RUN apt update && apt install -y build-essential curl git cmake libudev-dev pkg-config file make perl yasm gnupg

RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
RUN curl -sL https://deb.nodesource.com/setup_14.x  | bash -
RUN apt-get -y install nodejs

#OE

FROM base as builder
RUN git clone --branch v3.3.4 --depth 1 https://github.com/openethereum/openethereum

WORKDIR /openethereum

RUN . ~/.cargo/env && cargo build --release --features final && strip target/release/openethereum

WORKDIR ../
RUN git clone --branch DOI-1852-single-dockerfile https://github.com/energywebfoundation/ewc-rosetta.git

RUN npm i -g yarn

WORKDIR /ewc-rosetta
RUN yarn --silent
RUN yarn build


FROM base as release

COPY --from=builder /openethereum/target/release/openethereum bin/openethereum

RUN mkdir /bin/ewc-rosetta

COPY --from=builder ewc-rosetta/dist bin/ewc-rosetta/dist
COPY --from=builder ewc-rosetta/node_modules bin/ewc-rosetta/node_modules

COPY --from=builder ewc-rosetta/start.sh /
RUN chmod +x /start.sh

CMD ["/start.sh"]
