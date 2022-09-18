const path = require("path");
const fs = require("fs");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const typeDefsDir = path.join(__dirname, "./typedefs");

const typeDefs = fs
  .readdirSync(typeDefsDir)
  .map((file) => fs.readFileSync(path.join(typeDefsDir, file)));

module.exports = makeExecutableSchema({
  typeDefs: typeDefs.join("\n"),
  resolvers: require("./resolvers"),
});
