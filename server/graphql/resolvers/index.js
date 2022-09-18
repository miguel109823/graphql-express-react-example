const { postQueries, postMutations } = require("./post");

module.exports = {
  Query: { ...postQueries },
  Mutation: { ...postMutations },
};
