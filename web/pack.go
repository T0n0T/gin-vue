//go:build dist
// +build dist

package web

import "embed"

//go:embed all:dist
var WebResouce embed.FS
