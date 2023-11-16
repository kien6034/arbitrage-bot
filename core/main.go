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

	// Contact the server and print out its response.
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	// Start timing
	startTime := time.Now()

	r, err := c.GetPrice(ctx, &whirlpool.GetPriceRequest{TokenA: "Afy8qEgeJykFziRwiCk6tnBbd3uzxMoEqn2GTNCyGN7P", TokenB: "So11111111111111111111111111111111111111112"})
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}

	// Calculate elapsed time
	elapsedTime := time.Since(startTime)

	log.Printf("Data: %f", r.Price)
	log.Printf("Request took: %s", elapsedTime)
}
