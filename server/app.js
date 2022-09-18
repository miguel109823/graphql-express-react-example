const { SERVER_PORT } = process.env;
const cors = require("cors");
const express = require("express");
var { graphqlHTTP } = require("express-graphql");

const db = require("_db");
const graphqlSchema = require("_graphql/schema");

const sql = `
  CREATE TABLE IF NOT EXISTS 'posts_tbl' (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    updated_at TEXT,
    created_at TEXT,
    message TEXT
  );
`;

module.exports = () => {
  const app = express();
  db.exec(sql, async (err) => {
    if (err) throw err;

    app.use(express.json());
    app.use(cors());

    app.use(
      "/graphql",
      graphqlHTTP({
        schema: graphqlSchema,
        customFormatErrorFn: (e) => {
          console.error(e);
          return e.message;
        },
        graphiql: true,
      })
    );
    app.listen(SERVER_PORT, () => {
      console.log(`Listening on http://localhost:${SERVER_PORT}/graphql`);
    });
  });
  return app;
};
