package main

import (
	"fmt"
	"log"
	"net/http"
	"server/internal/handlers"
	"server/internal/middleware"
	"server/internal/migrations"
	"server/internal/services"
)

func main() {

	log.Println("Server starting...")

	appCtx := services.NewAppContext()

	migrations.AutoMigrate(appCtx.GormDB)

	mux := http.NewServeMux()

	wrappedMux := middleware.Chain(mux,
		middleware.CORS,
		middleware.LogRequest,
		// Add other middleware here as needed
	)

	handlers.SetupRouter(appCtx, mux)

	srv := &http.Server{
		Addr:    ":8080",
		Handler: wrappedMux,
	}

	log.Println("Server is listening on http://localhost:8080")
	if err := srv.ListenAndServe(); err != nil {
		fmt.Printf("Error starting server: %s\n", err)
	}

}
