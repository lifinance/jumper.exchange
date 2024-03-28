## Base builder
FROM node:20 AS builder
ENV NEXT_TELEMETRY_DISABLED=1 NODE_ENV=production YARN_VERSION=4.0.1
RUN corepack enable && corepack prepare yarn@${YARN_VERSION}
WORKDIR /app
COPY . .
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN yarn install --immutable
ARG ENV_FILE=.env
COPY ./$ENV_FILE ./.env
RUN yarn run build

## Runner
FROM node:20-alpine AS runner
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
WORKDIR /app
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/.env ./.env
USER nextjs
EXPOSE 3000
ENV PORT 3000
ENTRYPOINT ["yarn", "start"]