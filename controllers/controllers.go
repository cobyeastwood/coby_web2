package controllers

import (
	crand "crypto/rand"
	"encoding/binary"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"

	rand "math/rand"
	"net/http"
	"os"
	"sync"

	"github.com/go-chi/chi"
)

var mu sync.Mutex

// Routes Mux
func Routes(r *chi.Mux) {

	// go getRoutes()  // then display?

	r.Get("/api/v1/typicode", getRoutes(typicodes))
	r.Get("/api/v1/quote", getRoutes(quotes))

}

func getRoutes(gofunc func(chan map[string]interface{}, chan error)) func(w http.ResponseWriter, r *http.Request) {

	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		ch := make(chan map[string]interface{})
		er := make(chan error)

		go gofunc(ch, er)

		select { // Look into further
		case jsonOut := <-ch:
			json.NewEncoder(w).Encode(jsonOut)
		case err := <-er:
			http.Error(w, "Bad request - Go away!", 400)
			fmt.Println(err)
		}

	}
}

func goGorountine(ch chan<- map[string]interface{}, body io.ReadCloser) {

	mu.Lock()
	defer mu.Unlock()

	jsonIn := make(map[string]interface{})
	json.NewDecoder(body).Decode(&jsonIn)

	ch <- jsonIn // Send it back

}

type cryptoSource struct{}

func (s cryptoSource) Seed(seed int64) {}

func (s cryptoSource) Int63() int64 {
	return int64(s.Uint64() & ^uint64(1<<63))
}

func (s cryptoSource) Uint64() (v uint64) {
	err := binary.Read(crand.Reader, binary.BigEndian, &v)
	if err != nil {
		log.Fatal(err)
	}
	return v
}

func typicodes(ch chan map[string]interface{}, er chan error) {

	var src cryptoSource
	rnd := rand.New(src)

	randInt := fmt.Sprint(rnd.Intn(100))

	typiURL := os.Getenv("TYPI_URL")

	re, err := http.Get(typiURL + randInt)

	err = errors.New("TestTypi")

	if err != nil {
		er <- err
	}

	goGorountine(ch, re.Body)

	defer re.Body.Close()

}

func quotes(ch chan map[string]interface{}, er chan error) {

	rapidURL := os.Getenv("RAPID_URL")
	rapidHost := os.Getenv("RAPID_HOST")
	rapidKey := os.Getenv("RAPID_KEY")

	req, _ := http.NewRequest("GET", rapidURL, nil)

	req.Header.Add("x-rapidapi-host", rapidHost)
	req.Header.Add("x-rapidapi-key", rapidKey)

	re, err := http.DefaultClient.Do(req)

	// err = errors.New("Test")

	if err != nil {
		er <- err
	}

	goGorountine(ch, re.Body)

	defer re.Body.Close()

}
