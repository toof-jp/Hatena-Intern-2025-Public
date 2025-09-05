package renderer

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_Render(t *testing.T) {
	src := `# Heading

This is *italic* and **bold**.

- item1
- item2

[Google](https://google.com/)`
	want := `<h1>Heading</h1>
<p>This is <em>italic</em> and <strong>bold</strong>.</p>
<ul>
<li>item1</li>
<li>item2</li>
</ul>
<p><a href="https://google.com/">Google</a></p>
`

	html, err := Render(context.Background(), src)
	assert.NoError(t, err)
	assert.Equal(t, want, html)
}
