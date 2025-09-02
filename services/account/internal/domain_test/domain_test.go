package domain

import (
	"os"
	"testing"

	"github.com/hatena/Hatena-Intern-2025/services/account/internal/testutil"
	"github.com/hatena/Hatena-Intern-2025/services/account/repository"
	"github.com/jmoiron/sqlx"
)

func TestMain(m *testing.M) {
	os.Exit(run(m))
}

var testDB *sqlx.DB

func run(m *testing.M) int {
	db, err := testutil.NewDB()
	if err != nil {
		panic(err)
	}
	defer func() {
		if err := db.Close(); err != nil {
			panic(err)
		}
	}()
	testDB = db

	return m.Run()
}

func setup() *repository.Repository {
	return repository.NewRepository(testDB)
}
