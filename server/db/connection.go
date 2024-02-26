package db

import (
	"context"
	"fmt"

	"github.com/redis/go-redis/v9"
)

func DbConnection() *redis.Client {
	conn := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	})

	ping, err := conn.Ping(context.Background()).Result()
	if err != nil {
		fmt.Println(err.Error())
	}

	fmt.Println((ping))

	redisClient := conn

	return redisClient
}
