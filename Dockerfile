FROM node:slim

ENV NODE_ENV development

WORKDIR /educadata-back

COPY . .

# Remove caracteres de retorno de carro dos arquivos
RUN sed -i 's/\r$//' wait-for-it.sh && \
    sed -i 's/\r$//' index.js && \
    npm install

CMD ["./wait-for-it.sh", "sqlserver:1433", "--", "node", "index.js"]

EXPOSE 8080
