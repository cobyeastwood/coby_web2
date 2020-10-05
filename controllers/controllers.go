package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

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

	typiURL := os.Getenv("TYPI_URL")

	resp, err := http.Get(typiURL)

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

// GetQuotes func
func GetQuotes(ch chan map[string]interface{}) {

	rapidURL := os.Getenv("RAPID_URL")
	rapidHost := os.Getenv("RAPID_HOST")
	rapidKey := os.Getenv("RAPID_KEY")

	req, _ := http.NewRequest("GET", rapidURL, nil)

	req.Header.Add("x-rapidapi-host", rapidHost)
	req.Header.Add("x-rapidapi-key", rapidKey)

	resp, err := http.DefaultClient.Do(req)

	quote := make(map[string]interface{})
	json.NewDecoder(resp.Body).Decode(&quote)

	if err != nil {
		fmt.Println(err)
	}

	defer resp.Body.Close()

	ch <- quote // Send it back
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

	r.Get("/api/typicode", func(w http.ResponseWriter, r *http.Request) {

		ch := make(chan []Typi) // Goroutines speed it up a little

		go GetTypicodeTodos(ch)

		jsonIn := <-ch

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(jsonIn)

	})

	r.Get("/api/quote", func(w http.ResponseWriter, r *http.Request) {

		ch := make(chan map[string]interface{}) // Goroutines speed it up a little

		go GetQuotes(ch)

		jsonIn := <-ch

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(jsonIn)

	})

}
