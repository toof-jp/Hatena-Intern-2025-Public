# syntax=docker/dockerfile:1

FROM node:22-slim AS builder
RUN corepack enable

WORKDIR /services/renderer-ts
RUN --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=yarn.lock,target=yarn.lock \
  --mount=type=bind,source=.yarnrc.yml,target=.yarnrc.yml \
  --mount=type=bind,source=.yarn,target=.yarn,readwrite \
  --mount=type=cache,id=yarn,target=/root/.yarn/berry/cache \
  yarn install --immutable
COPY . .
RUN yarn build


FROM node:22-slim
RUN corepack enable

# ref: https://docs.docker.com/engine/reference/builder/#automatic-platform-args-in-the-global-scope
ARG TARGETARCH
ADD --chmod=111 https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/v0.4.28/grpc_health_probe-linux-${TARGETARCH} /bin/grpc_health_probe

WORKDIR /services/renderer-ts
COPY --from=builder /services/renderer-ts/dist dist
RUN --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=yarn.lock,target=yarn.lock \
  --mount=type=bind,source=.yarnrc.yml,target=.yarnrc.yml \
  --mount=type=bind,source=.yarn,target=.yarn,readwrite \
  --mount=type=cache,id=yarn,target=/root/.yarn/berry/cache \
  yarn install --immutable
COPY pb pb

USER 1000

ENTRYPOINT ["node", "dist/index.mjs"]
