package models

import (
	"gorm.io/gorm"
)

// Post represents the structure of our post
type Post struct {
	gorm.Model
	Title  string `json:"title"`
	Desc   string `json:"desc"`
	UserId *uint  `json:"userId"`
}
