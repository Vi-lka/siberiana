FROM node:alpine AS builder

RUN apk add --no-cache libc6-compat python3 g++ make
RUN apk update

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN corepack enable pnpm

WORKDIR /app
RUN pnpm add -g turbo
COPY . .
RUN turbo prune --scope=@siberiana/admin --docker

FROM builder AS installer

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --filter=@siberiana/admin

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm turbo run build --filter=@siberiana/admin...

FROM installer AS runner

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=installer /app/apps/admin/next.config.js .
COPY --from=installer /app/apps/admin/package.json .

COPY --from=installer --chown=nextjs:nodejs /app/apps/admin/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/admin/.next/static ./apps/admin/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/admin/.next/cache ./apps/admin/.next/cache
COPY --from=installer --chown=nextjs:nodejs /app/apps/admin/public ./apps/admin/public

RUN chown -R nextjs ./apps/admin/.next/cache
USER nextjs

EXPOSE 3001
ENV PORT 3001
CMD ["node", "apps/admin/server.js"]
