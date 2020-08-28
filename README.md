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

Energyweb Rosetta API requires synchronized EWC (or Volta) node to be available via JSON-RPC endpoint 

## Local

Use template `.env.example.ewc` or `.env.example.volta` and rename it to `.env` 

```
yarn
yarn build
yarn start
```
