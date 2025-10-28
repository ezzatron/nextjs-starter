FROM node:24.10.0

WORKDIR /app

ENV HOSTNAME=0.0.0.0
ENV NODE_ENV=production

# Set up a non-root user to run as
RUN addgroup --system nodejs && adduser --system nextjs

COPY --chown=nextjs:nodejs out/next/standalone ./

# Run as non-root user
USER nextjs

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl --fail http://localhost:3000/robots.txt

ENTRYPOINT ["node", "server.js"]
