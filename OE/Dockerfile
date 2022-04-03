FROM ubuntu:18.04 as builder

RUN apt update && apt install -y build-essential curl git cmake libudev-dev pkg-config file make perl yasm

RUN curl https://sh.rustup.rs -sSf | sh -s -- -y

RUN git clone --branch v3.3.4 --depth 1 https://github.com/openethereum/openethereum

WORKDIR /openethereum

RUN . ~/.cargo/env && cargo build --release --features final && strip target/release/openethereum

FROM ubuntu:latest

COPY --from=builder /openethereum/target/release/openethereum bin/openethereum

CMD [ "openethereum", "--chain", "Volta" ]
