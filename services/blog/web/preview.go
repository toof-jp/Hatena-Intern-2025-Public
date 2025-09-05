package web

import (
	"io"
	"net/http"

	echo "github.com/labstack/echo/v4"
)

func (s *Server) PreviewHandler() echo.HandlerFunc {
	return func(c echo.Context) error {
		// If `source` query parameter is provided, render it via renderer service and return HTML.
		// Read source markdown from request body (POST /preview)
		data, err := io.ReadAll(c.Request().Body)
		if err != nil {
			return err
		}
		src := string(data)
		if src == "" {
			return c.String(http.StatusBadRequest, "source is required")
		}
		html, err := s.app.Render(c.Request().Context(), src)
		if err != nil {
			return err
		}
		return c.HTML(http.StatusOK, html)
	}
}
