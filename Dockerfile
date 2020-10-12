FROM golang:latest AS builder

ADD . /app

WORKDIR /app

COPY go.* ./

RUN go mod vendor
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags "-w" -a -o /main .

######
# Build Static Assets 
######

FROM node:latest AS node_builder

WORKDIR /client/src

COPY --from=builder /app/client ./

RUN npm install
RUN npm run build

######
# Run Production
######

FROM alpine:latest

RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*

COPY ./cobyeastwood.com.chained.crt /usr/local/share/ca-certificates/cobyeastwood.com.chained.crt

RUN chmod 644 /usr/local/share/ca-certificates/cobyeastwood.com.chained.crt

COPY --from=builder /main ./
COPY --from=node_builder /client/src/build ./web

RUN chmod +x ./main

EXPOSE 80

ENV PORT "80"

CMD ["./main"]