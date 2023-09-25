package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"time"

	api "github.com/kien6034/arbitrage-bot/api-service/common"
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

	fmt.Println("hello %d", api.KeyExpireTime)
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
	r, err := c.GetPool(ctx, &whirlpool.GetPoolRequest{PoolAddr: "FRAztCuGoRXv71VTMxaKE2DVRMN8EFKDkR9jXE2jY9jd"})
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}
	log.Printf("Data: %d", r.Fee)
}
