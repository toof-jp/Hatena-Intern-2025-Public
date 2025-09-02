package vite

import (
	"encoding/json"
	"io"
)

func ParseManifest(source io.Reader) (Manifest, error) {
	manifest := Manifest{}
	decoder := json.NewDecoder(source)
	if err := decoder.Decode(&manifest); err != nil {
		return nil, err
	}
	return manifest, nil
}

// Manifest は Vite の manifest.json を表す。
type Manifest map[string]Chunk

// Chunk はVite が生成した manifest.json に含まれる chunk を表す。
// https://github.com/vitejs/vite/blob/9c808cdec89b807bff33eef37dfbb03557291ec1/packages/vite/src/node/plugins/manifest.ts#L11C33-L20
type Chunk struct {
	Src            string   `json:"src,omitempty"`
	File           string   `json:"file"`
	Css            []string `json:"css,omitempty"`
	Assets         []string `json:"assets,omitempty"`
	IsEntry        bool     `json:"isEntry,omitempty"`
	IsDynamicEntry bool     `json:"isDynamicEntry,omitempty"`
	Imports        []string `json:"imports,omitempty"`
	DynamicImports []string `json:"dynamicImports,omitempty"`
}
