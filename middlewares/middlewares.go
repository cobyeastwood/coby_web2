package middlewares

import (
	"log"
	"net"
	"net/http"
	"sync"
	"time"

	"golang.org/x/time/rate"
)

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
