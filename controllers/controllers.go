package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetRoutes takes in all Get routes
func GetRoutes(api *gin.RouterGroup) {
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
func PostRoutes(api *gin.RouterGroup) {
	api.POST("/pong", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
}
