# syntax=docker/dockerfile:1
FROM golang:1.24-bookworm AS builder

WORKDIR /services/renderer-go
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN --mount=type=cache,target=/root/.cache/go-build make build

FROM golang:1.24-bookworm

# ref: https://docs.docker.com/engine/reference/builder/#automatic-platform-args-in-the-global-scope
ARG TARGETARCH
ADD --chmod=111 https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/v0.4.28/grpc_health_probe-linux-${TARGETARCH} /bin/grpc_health_probe

COPY --from=builder /services/renderer-go/bin/server /services/renderer-go/bin/server

USER 1000

ENTRYPOINT ["/services/renderer-go/bin/server"]
