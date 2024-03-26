package handlers

import (
	"net/http"
	"server/internal/services"
)

func SetupRouter(appCtx *services.AppContext, mux *http.ServeMux) {
	postHandler := NewPostHandler(appCtx)

	mux.HandleFunc("GET /posts", postHandler.GetAllPosts)
	mux.HandleFunc("GET /posts/{id}", postHandler.GetPostByID)
	mux.HandleFunc("POST /posts", postHandler.AddPost)
	// Additional routes...

}
