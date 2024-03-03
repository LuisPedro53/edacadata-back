FROM node:slim

ENV NODE_ENV development

WORKDIR /educadata-back

COPY . .

RUN chmod +x wait-for-it.sh && npm install

CMD ["./wait-for-it.sh", "sqlserver:1433", "--", "node", "index.js"]

EXPOSE 8080
