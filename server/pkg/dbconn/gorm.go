package dbconn

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// InitGORM initializes the GORM DB connection.
func InitGORM(dsn string) (*gorm.DB, error) {
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	return db, nil
}
