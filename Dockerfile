FROM ubuntu:18.04 as builder

RUN apt update && apt install -y build-essential curl git cmake libudev-dev

RUN curl https://sh.rustup.rs -sSf | sh -s -- -y

RUN . ~/.cargo/env && rustup toolchain install 1.40.0 && rustup toolchain uninstall 1.46.0 && rustup default 1.40.0

RUN git clone --branch v2.5.13 --depth 1 https://github.com/openethereum/openethereum

WORKDIR /openethereum

RUN . ~/.cargo/env && cargo build --release --features final && strip target/release/parity

FROM ubuntu:latest

COPY --from=builder /openethereum/target/release/parity bin/openethereum

CMD [ "openethereum", "--chain", "Volta" ]
