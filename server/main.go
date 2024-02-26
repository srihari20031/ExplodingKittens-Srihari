package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"sort"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	// "github.com/srihari20031/explodingkittens/controllers"
	"github.com/srihari20031/explodingkittens/db"
)

// func leaderBoard(w http.ResponseWriter, r *http.Request) {
// 	fmt.Println(w, "Leaderboard page hit")
// }

// the program starts here

func main() {
	fmt.Println("Exploding .........")

	// var leaderBoard map[string]string
	// username := "user1"
	app := fiber.New()
	app.Use(cors.New())
	client := db.DbConnection()

	app.Post("/api/leaderboard", func(c *fiber.Ctx) error {
		var data map[string]string
		if err := c.BodyParser(&data); err != nil {
			return c.Status(http.StatusBadRequest).JSON(fiber.Map{
				"error": "Invalid request body",
			})
		}
		username := data["username"]

		//converts the string into numeric data 
		score, err := strconv.Atoi(data["score"])
		if err != nil {
			return c.Status(http.StatusBadRequest).JSON(fiber.Map{
				"error": "Invalid score format",
			})
		}

		//redis checks whether the  user already exists or not
		exists, err := client.Exists(context.Background(), username).Result()
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to check if user exists",
			})
		}

		//if user does not new user willl be created
		if exists == 0 {
			// User doesn't exist, create a new row in leaderboard
			err := client.HSet(context.Background(), "leaderboard", username, score).Err()
			if err != nil {
				return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
					"error": "Failed to create new user",
				})
			}
		} else {
			// User exists, increment the user score
			err := client.HIncrBy(context.Background(), "leaderboard", username, int64(score)).Err()
			if err != nil {
				return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
					"error": "Failed to update user score",
				})
			}
		}

		return c.JSON(fiber.Map{
			"message": "Score updated successfully",
		})
	})

	app.Get("/leaderboard", func(c *fiber.Ctx) error {
		// Retrieve leaderboard
		leaderboard, err := client.HGetAll(context.Background(), "leaderboard").Result()
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to retrieve leaderboard",
			})
		}

		// Convert leaderboard data to a slice of structs for sorting
		type playerScore struct {
			Username string
			Score    int
		}

		var players []playerScore
		for username, scoreStr := range leaderboard {
			score, _ := strconv.Atoi(scoreStr)
			players = append(players, playerScore{Username: username, Score: score})
		}

		// Sort players by score (descending order)
		sort.SliceStable(players, func(i, j int) bool {
			return players[i].Score > players[j].Score
		})

		// Prepare the response
		var leaderboardResponse []map[string]interface{}
		for rank, player := range players {
			leaderboardResponse = append(leaderboardResponse, map[string]interface{}{
				"rank":     rank + 1,
				"username": player.Username,
				"score":    player.Score,
			})
		}

		return c.JSON(fiber.Map{
			"leaderboard": leaderboardResponse,
		})
	})

	log.Fatal(app.Listen(":6000")) // listen on port 5000
}
