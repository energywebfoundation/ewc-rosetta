<h1 align="center">
  <br>
  <a href="https://www.energyweb.org/"><img src="https://www.energyweb.org/wp-content/uploads/2019/04/logo-brand.png" alt="EnergyWeb" width="150"></a>
  <br>
  EnergyWeb Rosetta API
  <br>
  <br>
</h1>

A Rosetta implementation for the [Energy Web Chain](https://energyweb.org)

# Overview
The Energy Web Chain (EW Chain) Rosetta API implementation allows you to quickly and easily launch a local EW Chain node and begin interacting with EW Chain using the standardized Rosetta API. This Rosetta implementation facilitates querying EW Chain (Data API) and generating and submitting blockchain transactions (Construction API).

## More on Rosetta:
* [Rosetta Overview](https://www.rosetta-api.org/)
* [Specifications](https://github.com/coinbase/rosetta-specifications)
* [Reference Go Implementation](https://github.com/coinbase/rosetta-sdk-go)
* [Rosetta CLI](https://github.com/coinbase/rosetta-cli)

# RPC endpoints

# Build / Run

Energyweb Rosetta API requires synchronized EWC (or Volta) archive node with tracing module enabled

## Local

Use template `.env.example.ewc` or `.env.example.volta` and rename it to `.env` 

```
yarn
yarn build
yarn start
```

## Docker deployment example

### 1. Build container using Dockerfile

```shell
docker build -t ewc-rosetta:latest .
```
or within repository you can run `make build`

### 2. Run container:
#### MAINNET:ONLINE
```shell
docker run -d --rm -e "MODE=online" -e "NETWORK=mainnet" -e "WEB3_PROVIDER_URL=http://localhost:8545" -p 8080:8080 -p 8545:8545 ewc-rosetta:latest
```
or within repository you can run `make run-mainnet-online` 
#### MAINNET:OFFLINE
```shell
docker run -d --rm -e "MODE=offline" -e "NETWORK=mainnet" -e "WEB3_PROVIDER_URL=http://localhost:8545" -p 8080:8080 ewc-rosetta:latest
```
or within repository you can run `make run-mainnet-offline`
#### TESTNET:ONLINE
```shell
docker run -d --rm -e "MODE=online" -e "NETWORK=volta" -e "WEB3_PROVIDER_URL=http://localhost:8545" -p 8080:8080 -p 8545:8545 ewc-rosetta:latest
```
or within repository you can run `make run-volta-online`

#### TESTNET:OFFLINE
```shell
docker run -d --rm -e "MODE=offline" -e "NETWORK=volta" -e "WEB3_PROVIDER_URL=http://localhost:8545" -p 8080:8080 ewc-rosetta:latest
```
or within repository you can run `make run-volta-offline`

#### LOGGING LEVEL
Configuration accepts `LOG_LEVEL` env variable (by default it is set to `info`).
Possible options: `error`, `warn`, `info`, `debug` or `trace` or you can specify this by module like `rpc=debug, sync=trace` available modules `rpc`, `sync`, `discovery`, `network`, `tokio_reactor`, `engine`, `trace`, `finality`
#### Simple Example 
```shell
docker run -d --rm -e "MODE=online" -e "NETWORK=mainnet" -e "WEB3_PROVIDER_URL=http://localhost:8545" -e "LOG_LEVEL=debug" -p 8080:8080 -p 8545:8545 ewc-rosetta:latest
```
This would run container with Mainnet Online configuration with logging in the most verbose option - `debug`.

#### Advanced Example
```shell
docker run -d --rm -e "MODE=online" -e "NETWORK=mainnet" -e "WEB3_PROVIDER_URL=http://localhost:8545" -e "LOG_LEVEL=rpc=debug, sync=trace" -p 8080:8080 -p 8545:8545 ewc-rosetta:latest
```
