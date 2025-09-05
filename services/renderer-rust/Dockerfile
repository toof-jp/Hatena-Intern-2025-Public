# syntax=docker/dockerfile:1
FROM lukemathwalker/cargo-chef:latest-rust-1 AS chef
WORKDIR /services/renderer-rust

FROM chef AS planner
COPY . .
RUN cargo chef prepare --recipe-path recipe.json

FROM chef AS builder 
# Install protoc
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        protobuf-compiler \
    && rm -rf /var/lib/apt/lists/*

COPY --from=planner /services/renderer-rust/recipe.json recipe.json
RUN cargo chef cook --release --recipe-path recipe.json
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim 
WORKDIR /services/renderer-rust
COPY --from=builder ./services/renderer-rust/target/release/renderer-rust ./target/release/renderer-rust
# ref: https://docs.docker.com/engine/reference/builder/#automatic-platform-args-in-the-global-scope
ARG TARGETARCH
ADD --chmod=111 https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/v0.4.28/grpc_health_probe-linux-${TARGETARCH} /bin/grpc_health_probe
USER 1000
ENTRYPOINT ["./target/release/renderer-rust"]