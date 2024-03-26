package services

import (
	"log"
	"server/pkg/dbconn"

	"gorm.io/gorm"
)

type AppContext struct {
	GormDB *gorm.DB
	// Sentry  *sentry.Client
	// Mixpanel *mixpanel.Client
	// Add other services here
}

func NewAppContext() *AppContext {
	dsn := "postgres://hazou:123@localhost:5432/api"

	gormDB, err := dbconn.InitGORM(dsn)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	return &AppContext{
		GormDB: gormDB,
		// Sentry:  sentry,
		// Mixpanel: mixpanel,
		// Initialize other services here
	}
}
