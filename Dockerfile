FROM golang:latest

WORKDIR /coby_web

COPY . .

RUN go get -u github.com/go-chi/chi github.com/go-chi/chi/middleware github.com/joho/godotenv
RUN go mod vendor
RUN go build -o main .

WORKDIR /client

COPY package*.json ./
COPY ./ ./

RUN yarn install
RUN yarn run build

CMD cd .. ["./main"]

EXPOSE 8080