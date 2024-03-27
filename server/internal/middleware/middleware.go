package middleware

import (
	"net/http"
)

// Middleware type represents a function that takes and returns an http.Handler
type Middleware func(http.Handler) http.Handler

// Chain applies multiple middleware to an http.Handler
func Chain(h http.Handler, middlewares ...Middleware) http.Handler {
	for i := len(middlewares) - 1; i >= 0; i-- {
		h = middlewares[i](h)
	}
	return h
}
