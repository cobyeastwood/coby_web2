package controllers

import (
	crand "crypto/rand"
	"encoding/binary"
	"encoding/json"
	"fmt"
	"log"

	rand "math/rand"
	"net"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/go-chi/chi"
	"golang.org/x/time/rate"
)

// Routes Mux
func Routes(r *chi.Mux) {

	r.Get("/api/v1/typicode", typicodes)
	r.Get("/api/v1/quote", quotes)

}

type visitor struct {
	limit    *rate.Limiter
	lastSeen time.Time
}

var visitors = make(map[string]*visitor)
var mu sync.Mutex

func initVisit() {
	go cleanupVisitors()
}

func getVisitor(ip string) *rate.Limiter {
	mu.Lock()
	defer mu.Unlock()

	v, exists := visitors[ip]

	if !exists {
		limit := rate.NewLimiter(1, 5)
		visitors[ip] = &visitor{limit, time.Now()}
		return limit
	}

	v.lastSeen = time.Now()

	return v.limit
}

func cleanupVisitors() {
	for {
		time.Sleep(time.Minute)

		mu.Lock()
		for ip, v := range visitors {
			if time.Since(v.lastSeen) > 3*time.Minute {
				delete(visitors, ip)
			}
		}
		mu.Unlock()
	}
}

// Limit requests
func Limit(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ip, _, err := net.SplitHostPort(r.RemoteAddr)
		if err != nil {
			log.Println(err.Error())
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}
		limit := getVisitor(ip)
		if limit.Allow() == false {
			http.Error(w, http.StatusText(429), http.StatusTooManyRequests)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// GetTypicodeTodos func
func GetTypicodeTodos(ch chan map[string]interface{}) {

	mu.Lock()

	var src cryptoSource
	rnd := rand.New(src)

	randInt := fmt.Sprint(rnd.Intn(100))

	typiURL := os.Getenv("TYPI_URL")

	resp, err := http.Get(typiURL + randInt)

	if err != nil {
	}

	defer resp.Body.Close()
	defer mu.Unlock()

	var typi map[string]interface{}
	err2 := json.NewDecoder(resp.Body).Decode(&typi)

	if err2 != nil {
	}

	ch <- typi // Send it back

}

type cryptoSource struct{}

func (s cryptoSource) Seed(seed int64) {}

func (s cryptoSource) Int63() int64 {
	return int64(s.Uint64() & ^uint64(1<<63))
}

func (s cryptoSource) Uint64() (v uint64) {
	err := binary.Read(crand.Reader, binary.BigEndian, &v)
	if err != nil {
	}
	return v
}

// GetQuotes func
func GetQuotes(ch chan map[string]interface{}) {

	mu.Lock()

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
	}

	defer resp.Body.Close()
	defer mu.Unlock()

	ch <- quote // Send it back

}

func typicodes(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	ch := make(chan map[string]interface{}) // Goroutines speed it up a little

	go GetTypicodeTodos(ch)

	jsonIn := <-ch

	json.NewEncoder(w).Encode(jsonIn)

}

func quotes(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	ch := make(chan map[string]interface{}) // Goroutines speed it up a little

	go GetQuotes(ch)

	jsonIn := <-ch

	json.NewEncoder(w).Encode(jsonIn)

}
