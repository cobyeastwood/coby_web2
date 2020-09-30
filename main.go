package main

import (
	"net/http"

	"github.com/gin-gonic/contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

// GetRoutes takes in all Get routes
func getRoutes(api *gin.RouterGroup) {
	api.GET("/pong", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	api.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "ping",
			"payload": "worked!",
		})
	})
}

// PostRoutes takes in all Post routes
func postRoutes(api *gin.RouterGroup) {
	api.POST("/pong", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
}

func server(router *gin.Engine, port string) {

	config := cors.DefaultConfig()

	// Allow
	router.Use(cors.New(config))

	router.Use(static.Serve("/", static.LocalFile("./client/build", true)))

	api := router.Group("/api")

	getRoutes(api)
	postRoutes(api)

	router.Run(":" + port)

}

func main() {

	router := gin.Default()

	server(router, "8080")
}
