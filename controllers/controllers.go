package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi"
)

// Data struct
type Data struct {
	Message string `json:"message"`
	Payload string `json:"payload"`
}

// Routes Mux
func Routes(r *chi.Mux) {

	msg1 := Data{"ping", "test"}
	msg2 := Data{"pong", "test"}
	msg3 := Data{"pang", "test"}

	r.Get("/api/pong", func(w http.ResponseWriter, r *http.Request) {
		// w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(msg1)
	})

	r.Get("/api/ping", func(w http.ResponseWriter, r *http.Request) {
		// w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(msg2)
	})

	r.Get("/api/pang", func(w http.ResponseWriter, r *http.Request) {
		// w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(msg3)
	})
}
