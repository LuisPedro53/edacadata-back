FROM node:slim

ENV NODE_ENV development

WORKDIR /educadata-back

COPY . .

RUN npm install

CMD ["node", "index.js"]

EXPOSE 8000
