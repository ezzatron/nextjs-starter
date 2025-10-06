FROM node:24.9.0-slim

WORKDIR /app

ENV NODE_ENV=production

# Set up a non-root user to run as
RUN addgroup --system nodejs
RUN adduser --system nextjs

COPY --chown=nextjs:nodejs out/dist ./

# Run as non-root user
USER nextjs

ENTRYPOINT ["node", "server.js"]
