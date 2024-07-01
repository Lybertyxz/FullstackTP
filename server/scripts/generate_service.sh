#!/bin/bash

if [ $# -lt 1 ]; then
  echo "Usage: $0 modelName"
  exit 1
fi

MODEL_NAME=$1
MODEL_NAME_C="$(tr '[:lower:]' '[:upper:]' <<< ${MODEL_NAME:0:1})${MODEL_NAME:1}"

HANDLER_PATH="./internal/handlers/${MODEL_NAME}.go"
MODEL_PATH="./internal/models/${MODEL_NAME}.go"


# Création du model

cat <<EOF > "$MODEL_PATH"
package models

import (
	"gorm.io/gorm"
)

// ${MODEL_NAME_C} represents the structure of our ${MODEL_NAME}
type ${MODEL_NAME_C} struct {
	gorm.Model
	Title string \`json:"title"\`
	Desc  string \`json:"desc"\`
}
EOF

echo "Fichier modèle ${MODEL_NAME}.go créé avec succès."


# Création du handler

cat <<EOF > "$HANDLER_PATH"
package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/internal/models"
	"server/internal/services"

	"gorm.io/gorm"
)

// ${MODEL_NAME_C}Handler will handle all requests to the ${MODEL_NAME_C} routes.
type ${MODEL_NAME_C}Handler struct {
	DB *gorm.DB
}

// New${MODEL_NAME_C}Handler returns a new ${MODEL_NAME_C}Handler with the given GORM DB connection.
func New${MODEL_NAME_C}Handler(ctx *services.AppContext) *${MODEL_NAME_C}Handler {
	return &${MODEL_NAME_C}Handler{DB: ctx.GormDB}
}

// GetAll${MODEL_NAME_C}s handles the HTTP GET requests for '/${MODEL_NAME}s'.
func (h *${MODEL_NAME_C}Handler) GetAll${MODEL_NAME_C}s(w http.ResponseWriter, r *http.Request) {
	var items []models.${MODEL_NAME_C}

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

// Add${MODEL_NAME_C} handles the HTTP POST requests for '/${MODEL_NAME}s'.
func (h *${MODEL_NAME_C}Handler) Add${MODEL_NAME_C}(w http.ResponseWriter, r *http.Request) {
	var item models.${MODEL_NAME_C}

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

	fmt.Fprintf(w, "${MODEL_NAME_C} created successfully!")
}

// Get${MODEL_NAME_C}ByID handles the HTTP GET requests for '/${MODEL_NAME}/{id}'.
func (h *${MODEL_NAME_C}Handler) Get${MODEL_NAME_C}ByID(w http.ResponseWriter, r *http.Request) {
	var post models.${MODEL_NAME_C}

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
EOF

echo "Le fichier handler pour ${MODEL_NAME} a été créé avec succès."
