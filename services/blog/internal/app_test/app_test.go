package app

import (
	"os"
	"testing"

	"github.com/hatena/Hatena-Intern-2025/services/blog/app"
	"github.com/hatena/Hatena-Intern-2025/services/blog/internal/testutil"
	"github.com/hatena/Hatena-Intern-2025/services/blog/repository"
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

type testFixture struct {
	app            *app.App
	repo           *repository.Repository
	accountClient  *testutil.TestAccountClient
	rendererClient *testutil.TestRendererClient
}

func setup() *testFixture {
	accountClient := testutil.CreateTestAccountClient()
	rendererClient := testutil.CreateTestRendererClient()
	a := app.NewApp(testDB, accountClient, testutil.AccountECDSAPublicKey, rendererClient)
	repo := repository.NewRepository(testDB)
	return &testFixture{a, repo, accountClient, rendererClient}
}
