package models

import (
	"gorm.io/gorm"
)

// Post represents the structure of our blog post
type Post struct {
	gorm.Model
	Title string `json:"title"`
	Desc  string `json:"desc"`
}
