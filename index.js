const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const app = express();
const port = 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
