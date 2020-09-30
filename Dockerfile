FROM golang:latest
WORKDIR /coby_web

COPY . .

RUN go get -u github.com/gin-gonic/gin github.com/gin-gonic/contrib/static github.com/gin-gonic/contrib/cors
RUN go build -o main .

EXPOSE 8080
CMD ["./main"]