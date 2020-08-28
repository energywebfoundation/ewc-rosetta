FROM ubuntu:18.04 as builder

RUN apt update && apt install -y build-essential curl git make cmake file binutils openssl libudev-dev yasm g++

RUN curl https://sh.rustup.rs -sSf | sh -s -- -y

RUN . ~/.cargo/env && rustup toolchain install 1.40.0

RUN git clone --branch v2.5.13-fix --depth 1 https://github.com/energywebfoundation/openethereum

WORKDIR /openethereum

RUN . ~/.cargo/env && cargo build --release --features final && strip target/release/parity && file target/release/parity