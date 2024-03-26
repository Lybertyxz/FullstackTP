package main

import (
	"fmt"
	"log"
	"net/http"
	"server/internal/handlers"
	"server/internal/migrations"
	"server/internal/services"
)

func main() {

	log.Println("Server starting...")

	appCtx := services.NewAppContext()

	migrations.AutoMigrate(appCtx.GormDB)

	mux := http.NewServeMux()

	handlers.SetupRouter(appCtx, mux)

	srv := &http.Server{
		Addr:    ":8080",
		Handler: services.LogRequest(mux),
	}

	log.Println("Server is listening on http://localhost:8080")
	if err := srv.ListenAndServe(); err != nil {
		fmt.Printf("Error starting server: %s\n", err)
	}

}
