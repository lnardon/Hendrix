FROM node:latest as build-frontend
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM golang:latest as build-backend
WORKDIR /app
COPY . .
COPY --from=build-frontend /app/dist /app/dist
RUN CGO_ENABLED=0 GOOS=linux go build -o main
EXPOSE 1969
CMD ["./main"]