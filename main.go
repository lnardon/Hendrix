package main

import (
	"fmt"
	"net/http"
)

func main() {
    http.Handle("/", http.FileServer(http.Dir("./dist")))

	fmt.Println("Server started on :1969")
	err := http.ListenAndServe(":1969", nil)
	if err != nil {
		fmt.Println("Error:", err)
	}
}