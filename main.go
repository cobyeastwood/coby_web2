package main

import (
	"net/http"
	"os"
	"time"

	"github.com/cobyeastwood/coby_web/controllers"
	"github.com/cobyeastwood/coby_web/servers"
	"github.com/go-chi/cors"
	"github.com/go-chi/httprate"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

func main() {

	// Development
	// os.Setenv("PORT", "8080")

	port := ":" + os.Getenv("PORT")
	static := "./web"

	r := chi.NewRouter()

	// Add Middlewares
	r.Use(httprate.LimitByIP(50, 1*time.Minute))
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*cobyeastwood.com"},
		AllowedMethods:   []string{"GET"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300,
	}))
	r.Use(middleware.StripSlashes)
	r.Use(middleware.Timeout(60 * time.Second))

	// Add Routes
	controllers.Routes(r)

	// Serve Static Files
	servers.FileServer(r, static)

	// Serve All on Port
	http.ListenAndServe(port, r)

}
