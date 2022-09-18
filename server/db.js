const { promisify } = require("util");
const sqlite3 = require("sqlite3").verbose();
const { SQLITE_DATABASE = ":memory:" } = process.env;
const instance = new sqlite3.Database(SQLITE_DATABASE);

instance.promise = {
  exec: (query) => {
    return new Promise((resolve, reject) =>
      instance.exec(query, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve({ ...this, data });
        }
      })
    );
  },
  run: (query, values = []) => {
    return new Promise((resolve, reject) =>
      instance.run(query, values, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve({ ...this, data });
        }
      })
    );
  },
  all: promisify(instance.all.bind(instance)),
  get: promisify(instance.get.bind(instance)),
};

module.exports = instance;
