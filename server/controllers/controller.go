package controllers

import (
	"context"
	"encoding/json"
	"net/http"

	"log"

	"github.com/redis/go-redis/v9"
)

func HandleLeaderBoard(client *redis.Client) (w http.ResponseWriter, r *http.Request) {
	// Check if the username exists in the Redis database

	username := r.URL.Query().Get("username")
	if username == "" {
		http.Error(w, "Username is required", http.StatusBadRequest)
		return
	}

	score := client.HIncrBy(context.Background(), "leaderboard", username, 1).Val()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]int64{"score": score})

	exists, err := client.Exists(context.Background(), username).Result()
	if err != nil {
		log.Fatalf("Failed to check if username exists: %v", err)
	}

	// If the username doesn't exist, create it with the points
	if exists == 0 {
		err := client.Set(context.Background(), username, score, 0).Err()
		if err != nil {
			log.Fatalf("Failed to set username and points: %v", err)
		}
	} else {
		// If the username exists, increment the points
		err := client.IncrBy(context.Background(), username, int64(score)).Err()
		if err != nil {
			log.Fatalf("Failed to increment points: %v", err)
		}
	}

	return 
}
