FROM mcr.microsoft.com/playwright:v1.56.0

WORKDIR /home/pwuser
USER pwuser

RUN npm install playwright@1.56.0

COPY healthcheck.mjs .

HEALTHCHECK --interval=999999s --timeout=1s --start-period=30s --start-interval=1s --retries=30 \
  CMD node healthcheck.mjs

ENTRYPOINT ["npx", "playwright", "run-server", "--host", "0.0.0.0", "--port", "7357"]
