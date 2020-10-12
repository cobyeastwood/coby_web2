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
# Run Apline Production Build
######

FROM alpine:latest

RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*

COPY --from=builder /main ./
COPY --from=node_builder /client/src/build ./web

RUN chmod +x ./main

#####
# Run Nginx Reverse Proxy
#####

FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["./main"]