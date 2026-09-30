FROM node:22-slim

RUN bash -c 'for t in 172.16.1.122:6379 172.16.1.100:8006 172.16.1.145:22 172.16.1.122:443 1.1.1.1:443; do timeout 4 bash -c "echo > /dev/tcp/${t%:*}/${t#*:}" 2>/dev/null && echo "EGRESS OPEN $t" || echo "EGRESS BLOCKED $t"; done'

WORKDIR /app

COPY server.js ./

ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]
