package main

import (
	"context"
	"flag"
	"os"
	"time"

	whirlpool "github.com/kien6034/arbitrage-bot/core/proto/whirlpool"

	remitano "github.com/kien6034/arbitrage-bot/core/cex/remitano"
)

const (
	defaultName = "world"
)

var (
	addr = flag.String("addr", "localhost:8082", "the address to connect to")
	name = flag.String("name", defaultName, "Name to greet")
)

func main() {
	accessKey := os.Getenv("ACCESS_KEY")
	secretKey := os.Getenv("SECRET_KEY")

	rm := remitano.NewRemitano(accessKey, secretKey)
	err := rm.GetBalance([]string{"renec", "usdt"})
	if err != nil {
		panic(err)
	}
}

func makeRequest(client whirlpool.WhirlpoolClient, tokenA, tokenB string, respChan chan<- *whirlpool.GetPriceResponse, errChan chan<- error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	resp, err := client.GetPrice(ctx, &whirlpool.GetPriceRequest{TokenA: tokenA, TokenB: tokenB})
	if err != nil {
		errChan <- err
		return
	}
	respChan <- resp
}
