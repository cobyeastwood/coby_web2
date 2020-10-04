package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi"
)

// Data json struct
type Data struct {
	Message string `json:"message"`
	Payload string `json:"payload"`
}

// Typi json struct
type Typi struct {
	UserID    int    `json:"userId"`
	ID        int    `json:"id"`
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
}

// GetTypicodeTodos func
func GetTypicodeTodos(ch chan []Typi) {
	resp, err := http.Get("https://jsonplaceholder.typicode.com/todos")

	if err != nil {
		fmt.Println(err)
	}

	defer resp.Body.Close()

	var typi []Typi
	err2 := json.NewDecoder(resp.Body).Decode(&typi)

	if err2 != nil {
		fmt.Println(err2)
	}

	ch <- typi // Send it back
}

// Routes Mux
func Routes(r *chi.Mux) {

	r.Get("/api/pong", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		msg1 := Data{"ping", "test"}
		json.NewEncoder(w).Encode(msg1)
	})

	r.Get("/api/ping", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		msg2 := Data{"pong", "test"}
		json.NewEncoder(w).Encode(msg2)
	})

	r.Get("/api/pang", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		msg3 := Data{"pang", "test"}
		json.NewEncoder(w).Encode(msg3)
	})

	r.Get("/api/typicode/todos", func(w http.ResponseWriter, r *http.Request) {

		ch := make(chan []Typi) // Goroutines speed it up a little

		go GetTypicodeTodos(ch)

		jsonIn := <-ch

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(jsonIn)

	})

}
