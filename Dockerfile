FROM golang:latest

WORKDIR /coby_web

COPY . .

RUN go get -u github.com/go-chi/chi github.com/go-chi/chi/middleware github.com/joho/godotenv
RUN go mod vendor
RUN go build -o main .

CMD ["./main"]

# cd client && \
#   apt-get update -qq && \
#   apt-get install -y yarn &&\
#   yarn install && \
#   yarn run build && \

EXPOSE 8080