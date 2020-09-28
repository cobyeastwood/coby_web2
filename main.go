package main

import (
	"net/http"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.Use(static.Serve("/", static.LocalFile("./views", true)))

	api := router.Group("/api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})
	}
	router.Run(":3000")
}

// import (
// 	"html/template"
// 	"net/http"
// 	"path"
// )

// var (
// 	port     = "8080"
// 	htmlPath = "server/src/public"
// )

// type Page struct {
// 	Title string
// 	Body  string
// }

// func main() {
// 	http.HandleFunc("/", viewHandler)
// 	http.ListenAndServe(":"+port, nil)
// }

// func renderTemplate(w http.ResponseWriter, htmlPage string) {
// 	page := Page{"Home", "Welcome to my homepage"}
// 	fp := path.Join(htmlPath, htmlPage)
// 	t, err := template.ParseFiles(fp)

// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	if err := t.Execute(w, page); err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 	}
// }

// func viewHandler(w http.ResponseWriter, r *http.Request) {
// 	renderTemplate(w, "index.html")
// }
