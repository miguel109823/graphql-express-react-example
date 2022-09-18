const db = require("_db");

exports.postQueries = {
  posts: async () => {
    const items = await db.promise.all(`SELECT * from posts_tbl`);
    return { items };
  },
  post: (_, { id }) => {
    return db.promise.get(`SELECT FROM posts_tbl WHERE id = ?`, id);
  },
};

exports.postMutations = {
  createPost: async (_, { input }) => {
    await db.promise.run(
      `INSERT INTO posts_tbl ( message, created_at, updated_at )
        VALUES ( ?, datetime(), datetime() )`,
      [input.message]
    );
    return null;
  },
  deletePost: async (_, { id }) => {
    await db.promise.run(`DELETE FROM posts_tbl WHERE id = ?`, id);
    return null;
  },
};
