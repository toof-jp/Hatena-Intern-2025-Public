package grpc

import (
	"context"
	"testing"

	pb "github.com/hatena/Hatena-Intern-2025/services/renderer-go/pb/renderer"
	"github.com/stretchr/testify/assert"
)

func Test_Server_Render(t *testing.T) {
	s := NewServer()
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
	reply, err := s.Render(context.Background(), &pb.RenderRequest{Src: src})
	assert.NoError(t, err)
	assert.Equal(t, want, reply.Html)
}
