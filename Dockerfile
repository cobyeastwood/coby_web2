FROM golang:latest
WORKDIR /coby_web

COPY . .

RUN go get -u github.com/go-chi/chi github.com/go-chi/chi/middleware
RUN go build -o main .

EXPOSE 8080
CMD ["./main"]