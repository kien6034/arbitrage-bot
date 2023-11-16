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

In this model, the `node-server` service needs to cache the `price` that according to a pair, using `application level caching`. We determine a `trading opportunity` inside a small `arbitrage_interval`, so it's expire time should be small.

Every `arbitrage_interval`, `core` service will call to get direct price data. So the `node-server` basically will fetch the price on each request.

So why do we need `caching`? We want our `node-sever` only get price data on each `arbitrage_interval`. Says if there are many requests within an `arbitrage_interval`, we want the price to be fetched only one.

## Concurrency

When multiple request of getting price hit the `node-server`, apply the `mutex` locking to prevent multiple fetching price at the same time.

## Logging
