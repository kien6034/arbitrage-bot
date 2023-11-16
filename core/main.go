package main

import (
	"context"
	"flag"
	"log"
	"time"

	whirlpool "github.com/kien6034/arbitrage-bot/core/proto/whirlpool"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

const (
	defaultName = "world"
)

var (
	addr = flag.String("addr", "localhost:8082", "the address to connect to")
	name = flag.String("name", defaultName, "Name to greet")
)

func main() {
	flag.Parse()
	// Set up a connection to the server.
	conn, err := grpc.Dial(*addr, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	c := whirlpool.NewWhirlpoolClient(conn)

	// Start timing
	startTime := time.Now()

	respChan := make(chan *whirlpool.GetPriceResponse)
	errChan := make(chan error)

	// Start two concurrent requests
	go makeRequest(c, "Afy8qEgeJykFziRwiCk6tnBbd3uzxMoEqn2GTNCyGN7P", "So11111111111111111111111111111111111111112", respChan, errChan)
	go makeRequest(c, "Afy8qEgeJykFziRwiCk6tnBbd3uzxMoEqn2GTNCyGN7P", "So11111111111111111111111111111111111111112", respChan, errChan)

	// Wait for responses
	for i := 0; i < 2; i++ {
		select {
		case resp := <-respChan:
			log.Printf("Data: %f", resp.Price)
		case err := <-errChan:
			log.Printf("Error: %v", err)
		}
	}

	// Calculate elapsed time
	elapsedTime := time.Since(startTime)

	log.Printf("Request took: %s", elapsedTime)
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
