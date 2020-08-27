FROM rust:1.45.2-slim-buster as builder

RUN apt update && apt install -y git make cmake file binutils openssl libudev-dev yasm g++

WORKDIR /openethereum

# don't loose state between builds
VOLUME /openethereum

RUN git clone --branch v2.5.13 --depth 1 https://github.com/openethereum/openethereum .

RUN cargo build --release --features final && strip target/release/openethereum && file target/release/openethereum

# keep the container running for debugging
CMD sleep infinity