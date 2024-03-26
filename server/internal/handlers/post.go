package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/internal/models"
	"server/internal/services"

	"gorm.io/gorm"
)

// PostHandler will handle all requests to the Post routes.
type PostHandler struct {
	DB *gorm.DB
}

// NewPostHandler returns a new PostHandler with the given GORM DB connection.
func NewPostHandler(ctx *services.AppContext) *PostHandler {
	return &PostHandler{DB: ctx.GormDB}
}

// GetAllPosts handles the HTTP GET requests for '/posts'.
func (h *PostHandler) GetAllPosts(w http.ResponseWriter, r *http.Request) {
	var posts []models.Post

	result := h.DB.Find(&posts)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(posts); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

// AddPost handles the HTTP POST requests for '/posts'.
func (h *PostHandler) AddPost(w http.ResponseWriter, r *http.Request) {
	var p models.Post

	err := json.NewDecoder(r.Body).Decode(&p)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	result := h.DB.Create(&p)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "Post created successfully!")
}

// GetPostByID handles the HTTP GET requests for '/posts/{id}'.
func (h *PostHandler) GetPostByID(w http.ResponseWriter, r *http.Request) {
	var post models.Post

	result := h.DB.Where("id = ?", r.PathValue("id")).First(&post)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(post); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
