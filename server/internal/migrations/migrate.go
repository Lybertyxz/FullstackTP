package migrations

import (
	"log"
	"server/internal/models"

	"gorm.io/gorm"
)

func AutoMigrate(g *gorm.DB) {
	if err := g.AutoMigrate(&models.Post{}); err != nil {
		log.Fatal("Failed to migrate database tables:", err)
	}
}
