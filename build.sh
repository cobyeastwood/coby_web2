#! /usr/bin/bash

rm -r client/build

cd client 

yarn run build

cd ..

go run main.go