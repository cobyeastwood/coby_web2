package main

import (
	"log"
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

func redirect(w http.ResponseWriter, req *http.Request) {
	// remove/add not default ports from req.Host
	target := "https://" + req.Host + req.URL.Path
	if len(req.URL.RawQuery) > 0 {
		target += "?" + req.URL.RawQuery
	}
	log.Printf("redirect to: %s", target)
	http.Redirect(w, req, target,
		// see comments below and consider the codes 308, 302, or 301
		http.StatusTemporaryRedirect)
}

func main() {

	go http.ListenAndServe(":80", http.HandlerFunc(redirect))

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
	http.ListenAndServeTLS(port, "key.pem", "cobyeastwood.com.chained.crt", r)

}
