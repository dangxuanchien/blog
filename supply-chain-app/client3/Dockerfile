# Install dependencies only when needed
# Stage 1: install dependencies
FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app
RUN mkdir -p /app/scpf-build

WORKDIR /scpf/ui
COPY --chown=node:node package.json ./
RUN yarn install --frozen-lockfile


# Stage 2: build
FROM node:16-alpine AS builder
WORKDIR /scpf/ui
COPY --chown=node:node --from=deps /scpf/ui/node_modules ./node_modules
COPY --chown=node:node --from=deps /scpf/ui/package.json ./package.json
RUN yarn build

# Stage 3: run
FROM node:16-alpine
WORKDIR /scpf/ui
COPY --chown=node:node --from=builder /scpf/ui/next.config.js ./
COPY --chown=node:node --from=builder /scpf/ui/.next ./.next
COPY --chown=node:node --from=builder /scpf/ui/public ./public
COPY --chown=node:node --from=builder /scpf/ui/node_modules ./node_modules
COPY --chown=node:node --from=builder /scpf/ui/package.json ./

CMD ["yarn", "start"]
# ENTRYPOINT ["tail"]
# CMD ["-f","/dev/null"]
