FROM node:20-alpine AS builder

RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

RUN npm install -g pnpm@9.12.0

COPY . .

RUN echo "fetch-retries=5" >> .npmrc && \
    echo "fetch-retry-maxtimeout=120000" >> .npmrc && \
    echo "registry=https://registry.yarnpkg.com/" >> .npmrc && \
    pnpm install --frozen-lockfile && \
    rm .npmrc

RUN pnpm --filter web build

FROM node:20-alpine AS runner
WORKDIR /app
RUN npm install -g pnpm@9.12.0
COPY --from=builder /app ./

EXPOSE 3000
CMD ["pnpm", "--filter", "web", "start"]