FROM mcr.microsoft.com/playwright:v1.59.1

WORKDIR /home/pwuser
USER pwuser

RUN npm install playwright@1.59.1

COPY health-check.ts ./health-check.mts

HEALTHCHECK --interval=999999s --timeout=1s --start-period=30s --start-interval=1s --retries=30 \
  CMD node --experimental-strip-types health-check.mts

ENTRYPOINT ["npx", "playwright", "run-server", "--host", "0.0.0.0", "--port", "7357"]
