FROM ubuntu:latest as base

RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_14.x  | bash -
RUN apt-get -y install nodejs

FROM base AS builder

RUN apt-get -y install git

RUN git clone https://github.com/energywebfoundation/ewc-rosetta.git

RUN npm i -g yarn

WORKDIR ewc-rosetta

RUN yarn --silent
RUN yarn build


FROM base as release

RUN mkdir /ewc-rosetta
WORKDIR /ewc-rosetta

COPY --from=builder ewc-rosetta/dist dist
COPY --from=builder ewc-rosetta/node_modules node_modules

CMD node dist/main.js