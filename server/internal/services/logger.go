package services

import (
	"log"
	"net/http"
)

// LogRequest is a simple middleware to log HTTP requests
func LogRequest(next *http.ServeMux) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Received request: %s %s", r.Method, r.URL.Path)
		next.ServeHTTP(w, r)
	})
}
