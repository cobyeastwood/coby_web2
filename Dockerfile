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

RUN apk --no-cache add ca-certificates

COPY --from=builder /main ./
COPY --from=node_builder /client/src/build ./web

RUN chmod +x ./main

EXPOSE 80

ENV PORT "80"
ENV RAPID_KEY "75977ac2c3msh5902e2849fbb40bp169709jsn626a021033df"

CMD ["./main"]