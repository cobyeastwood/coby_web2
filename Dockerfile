FROM golang:latest
WORKDIR /coby_web

COPY . .

RUN bash build.sh

RUN go get -u github.com/go-chi/chi github.com/go-chi/chi/middleware github.com/joho/godotenv
RUN go build -o main .

EXPOSE 8080
CMD ["./main"]