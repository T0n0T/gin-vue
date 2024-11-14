package main

import (
	"fmt"
	web "gin-vue/pack"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		method := c.Request.Method
		origin := c.Request.Header.Get("Origin")
		if origin != "" {
			c.Header("Access-Control-Allow-Origin", "*") // 可将将 * 替换为指定的域名
			c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
			c.Header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
			c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Cache-Control, Content-Language, Content-Type")
			c.Header("Access-Control-Allow-Credentials", "true")
		}
		if method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
		}
		c.Next()
	}
}

const picFolder = "./pics"

// 获取文件夹中所有图片文件的路径
func getImagePaths() ([]string, error) {
	var imagePaths []string

	// 打开 pic 文件夹
	files, err := os.ReadDir(picFolder)
	if err != nil {
		return nil, err
	}

	// 遍历文件夹中的文件
	for _, file := range files {
		// 确保文件是图片文件（可以根据后缀名过滤）
		if !file.IsDir() {
			ext := filepath.Ext(file.Name())
			if ext == ".jpg" || ext == ".jpeg" || ext == ".png" || ext == ".gif" {
				imagePaths = append(imagePaths, "/images/"+file.Name()) // 生成图片的 URL 路径
			}
		}
	}
	return imagePaths, nil
}

func main() {
	r := gin.Default()
	r.Use(Cors())
	web.InitResource(r)
	r.POST("/api", func(c *gin.Context) {
		c.String(http.StatusOK, "hello")
	})
	r.Static("/images", picFolder)

	// API 路径，返回 pic 文件夹中所有图片的路径
	r.GET("/api/images", func(c *gin.Context) {
		imagePaths, err := getImagePaths()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": fmt.Sprintf("无法读取图片文件夹: %v", err),
			})
			return
		}

		// 返回图片路径列表
		c.JSON(http.StatusOK, gin.H{
			"images": imagePaths,
		})
	})
	err := r.Run(":8888")
	if err != nil {
		panic(err)
	}
}
