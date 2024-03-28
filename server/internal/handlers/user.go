package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/internal/models"
	"server/internal/services"

	"gorm.io/gorm"
)

// UserHandler will handle all requests to the User routes.
type UserHandler struct {
	DB *gorm.DB
}

// NewUserHandler returns a new UserHandler with the given GORM DB connection.
func NewUserHandler(ctx *services.AppContext) *UserHandler {
	return &UserHandler{DB: ctx.GormDB}
}

// GetAllUsers handles the HTTP GET requests for '/users'.
func (h *UserHandler) GetAllUsers(w http.ResponseWriter, r *http.Request) {
	var items []models.User

	result := h.DB.Find(&items)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(items); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

// AddUser handles the HTTP POST requests for '/users'.
func (h *UserHandler) AddUser(w http.ResponseWriter, r *http.Request) {
	var item models.User

	err := json.NewDecoder(r.Body).Decode(&item)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	result := h.DB.Create(&item)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "User created successfully!")
}

// GetUserByID handles the HTTP GET requests for '/user/{id}'.
func (h *UserHandler) GetUserByID(w http.ResponseWriter, r *http.Request) {
	var post models.User

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
