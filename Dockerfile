FROM node:24.10.0-slim

WORKDIR /app

ENV NODE_ENV=production

# Set up a non-root user to run as
RUN addgroup --system nodejs && adduser --system nextjs

COPY --chown=nextjs:nodejs out/dist ./

# Run as non-root user
USER nextjs

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node health-check.mts

ENTRYPOINT ["node", "run.mjs"]
