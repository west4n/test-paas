FROM node:22-slim

RUN echo "KERNEL=$(uname -r)" && sleep 45

WORKDIR /app

COPY server.js ./

ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]
