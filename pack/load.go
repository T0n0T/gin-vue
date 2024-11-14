package pack

import (
	"embed"
	"errors"
	"io"
	"io/fs"
	"net/http"
	"path"
	"path/filepath"
	"strings"
)

// 嵌入普通的静态资源
type StaticResrc struct {
	src  embed.FS // 静态资源
	path string   // 设置embed文件到静态资源的相对路径，也就是embed注释里的路径
}

// 静态资源被访问的核心逻辑
func (s *StaticResrc) Open(name string) (http.File, error) {
	// open 的路径必须包含'/'
	if filepath.Separator != '/' && strings.ContainsRune(name, filepath.Separator) {
		return nil, errors.New("http: invalid character in file path")
	}
	fullName := filepath.Join(s.path, filepath.FromSlash(path.Clean("/"+name)))
	file, err := s.src.Open(fullName)
	sr := &StaticFile{
		File: file,
	}
	return sr, err
}

type StaticFile struct {
	io.Seeker
	fs.File
}

func (*StaticFile) Readdir(count int) ([]fs.FileInfo, error) {
	return nil, nil
}
