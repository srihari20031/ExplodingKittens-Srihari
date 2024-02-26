package db


// importing the packages required for the  database operations.
import (
	"context"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/redis/go-redis/v9"
)

// Create a new Redis client
func DbConnection() *redis.Client {
	// Load environment variables from .env file
	godotenv.Load()
	// Get Redis address from environment variable
	conn := redis.NewClient(&redis.Options{
		Addr:     os.Getenv("REDIS_ADDR"),
		Password: os.Getenv("REDIS_PASSWORD"), // no password set
		DB:       0,                           // use default DB
	})
	// Ping the Redis server
	ping, err := conn.Ping(context.Background()).Result()
	// If error return error
	if err != nil {
		fmt.Println(err.Error())
	}

	//if connected successfuly it returns pong 
	fmt.Println((ping))

	redisClient := conn

	//return statement should be there for evey go functions 
	return redisClient
}
