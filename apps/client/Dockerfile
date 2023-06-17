FROM node:alpine AS builder

RUN apk add --no-cache libc6-compat python3 g++ make
RUN apk update

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN corepack enable pnpm

WORKDIR /app
RUN pnpm add -g turbo
COPY . .
RUN turbo prune --scope=@siberiana/client --docker

FROM builder AS installer

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --filter=@siberiana/client

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm turbo run build --filter=@siberiana/client...

FROM installer AS runner

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/client/next.config.js .
COPY --from=installer /app/apps/client/package.json .

COPY --from=installer --chown=nextjs:nodejs /app/apps/client/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/client/.next/static ./apps/client/.next/static

# Директория public отсутствует на момент написания Dockerfile
# COPY --from=installer --chown=nextjs:nodejs /app/apps/client/public ./apps/client/public

EXPOSE 3000
ENV PORT 3000
CMD ["node", "apps/client/server.js"]
