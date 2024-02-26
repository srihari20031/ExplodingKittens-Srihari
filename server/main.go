package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
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

		// Check if user exists in database
		exists, err := client.Exists(context.Background(), username).Result()

		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to check if user exists",
			})
		}

		if exists == 1 {
			// User exists, increment their score by 1
			err := client.HIncrBy(context.Background(), "leaderboard", username, 1).Err()
			if err != nil {
				return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
					"error": "Failed to increment user score",
				})
			}
		} else {
			// User does not exist, add them to the leaderboard with a score of 1
			err := client.HSet(context.Background(), "leaderboard", username, 1).Err()
			if err != nil {
				return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
					"error": "Failed to add new user",
				})
			}
		}

		return c.Status(http.StatusOK).JSON(fiber.Map{
			"message": "Score updated successfully",
		})
	})

	app.Get("/api/leaderboard", func(c *fiber.Ctx) error {
		// Get leaderboard members along with their scores, in descending order(rev range is used for that)
		leaderboard, err := client.ZRevRangeWithScores(context.Background(), "leaderboard", 0, -1).Result()

		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to retrieve leaderboard",
			})
		}

		// Create a slice of map to hold the leaderboard data
		leaderboardData := make([]map[string]string, len(leaderboard))

		// Loop through the leaderboard and add data to the slice
		for i, member := range leaderboard {
			leaderboardData[i] = map[string]string{
				"username": member.Member.(string),
				"score":    strconv.FormatFloat(member.Score, 'f', -1, 64),
			}
		}

		// Return the leaderboard data
		return c.JSON(fiber.Map{
			"leaderboard": leaderboardData,
		})
	})

	log.Fatal(app.Listen(":5000")) // listen on port 5000
}
