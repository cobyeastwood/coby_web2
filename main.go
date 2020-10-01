package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"strings"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

type Data struct {
	Message string `json:"message"`
	Payload string `json:"payload"`
}

func runn() {
	fmt.Println("hello")
}

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	msg1 := Data{"ping", "test"}
	msg2 := Data{"pong", "test"}

	r.Get("/api/pong", func(w http.ResponseWriter, r *http.Request) {
		// w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(msg1)
	})

	r.Get("/api/ping", func(w http.ResponseWriter, r *http.Request) {
		// w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(msg2)
	})

	fileServer(r, "./client/build")

	runn()

	http.ListenAndServe(":8080", r)
}

func fileServer(r chi.Router, static string) {

	public := "/"

	if strings.ContainsAny(public, "{}*") {
		panic("FileServer does not permit URL parameters.")
	}

	root, _ := filepath.Abs(static)

	if _, err := os.Stat(root); os.IsNotExist(err) {
		panic("Static Documents Directory Not Found")
	}

	fs := http.StripPrefix(public, http.FileServer(http.Dir(root)))

	if public != "/" && public[len(public)-1] != '/' {
		r.Get(public, http.RedirectHandler(public+"/", 301).ServeHTTP)
		public += "/"
	}

	r.Get(public+"*", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		file := strings.Replace(r.RequestURI, public, "/", 1)
		if _, err := os.Stat(root + file); os.IsNotExist(err) {
			http.ServeFile(w, r, path.Join(root, "index.html"))
		}
		fs.ServeHTTP(w, r)
	}))
}
