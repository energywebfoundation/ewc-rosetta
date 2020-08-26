FROM alpine:latest AS builder

# show backtraces
ENV RUST_BACKTRACE 1

RUN apk add --no-cache \
  build-base \
  cargo \
  cmake \
  eudev-dev \
  linux-headers \
  perl \
  rust \
  git \
  openssh \
  clang-dev \
  llvm-dev

RUN git clone --branch v2.5.13 --depth 1 https://github.com/openethereum/openethereum
WORKDIR /openethereum

ENV C=clang CXX=clang++
RUN cargo build --release --features final --target x86_64-alpine-linux-musl --verbose
RUN strip target/x86_64-alpine-linux-musl/release/openethereum

FROM ubuntu:latest

COPY --from=builder /openethereum/target/x86_64-alpine-linux-musl/release/openethereum bin/openethereum

CMD [ "openethereum", "--chain", "Volta" ]
