# Arbitrage bots

Write a bot that do arbitarge in multi-chains.

## Why i write this bot?

- Main purpose is to learn system architect and design pattern.
- Second purpose is to make some money if possible
- Third purpose is to having fun with coding

## Criteria

This section notes main criteria that i'm building and want to achiev in this project

### Hybrid Microservice

- using `go` for core as the `monothic` service, which contains all logic to hanlde arbitrage
- each `chain` will be a `microservice` that connect to core service via `gRPC`

## Error handling

Since `node-server` microservice are expected to fails sometimes, because of RPC limit, invalid input, error handling is curcial for the succeed of the project

- implement `Result<T, E>` patterns of Rust, allow easily handling error.

## Caching

## Logging
