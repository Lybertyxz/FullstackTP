package models

import (
	"gorm.io/gorm"
)

// User represents the structure of our user
type User struct {
	gorm.Model
	Title string `json:"title"`
	Desc  string `json:"desc"`
}
