package main

import (
	"encoding/json"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

type Data struct {
	Message string `json:"message"`
	Payload string `json:"payload"`
}

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	msg1 := Data{"ping", "test"}
	msg2 := Data{"pong", "test"}

	workDir, _ := os.Getwd()

	r.Get("/api/pong", func(w http.ResponseWriter, r *http.Request) {
		// w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(msg1)
	})

	r.Get("/api/ping", func(w http.ResponseWriter, r *http.Request) {
		// w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(msg2)
	})

	filesDir := http.Dir(filepath.Join(workDir, "./client/build"))

	fileServer(r, "/", filesDir)

	http.ListenAndServe(":8080", r)
}

func fileServer(r chi.Router, path string, root http.FileSystem) {
	if strings.ContainsAny(path, "{}*") {
		panic("fileServer does not permit any URL parameters.")
	}

	if path != "/" && path[len(path)-1] != '/' {
		r.Get(path, http.RedirectHandler(path+"/", 301).ServeHTTP)
		path += "/"
	}
	path += "*"

	r.Get(path, func(w http.ResponseWriter, r *http.Request) {
		rctx := chi.RouteContext(r.Context())
		pathPrefix := strings.TrimSuffix(rctx.RoutePattern(), "/*")
		fs := http.StripPrefix(pathPrefix, http.FileServer(root))
		fs.ServeHTTP(w, r)
	})
}
