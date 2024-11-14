//go:build dist
// +build dist

package pack

import (
	"gin-vue/web"
	"html/template"
	"net/http"

	"github.com/gin-gonic/gin"
)

func InitResource(r *gin.Engine) {
	Src := &StaticResrc{
		src:  web.WebResouce,
		path: "dist/assets",
	}

	r.StaticFS("/assets", Src)
	r.SetHTMLTemplate(template.Must(template.ParseFS(web.WebResouce, "dist/index.html")))
	r.GET("/", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "index.html", nil)
	})

}
