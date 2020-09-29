package main

import (
	"github.com/cobyeastwood/coby_web/controllers"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func server(router *gin.Engine, port string) {

	router.Use(static.Serve("/", static.LocalFile("./client/build", true)))

	api := router.Group("/api")

	controllers.GetRoutes(api)
	controllers.PostRoutes(api)

	router.Run(":" + port)

}

func main() {

	router := gin.Default()

	server(router, "8080")
}
