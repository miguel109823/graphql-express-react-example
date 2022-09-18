const packageName = require("./package.json").name;

module.exports = {
  apps: ["client", "server"].map((id) => ({
    name: `${packageName}-${id}`,
    script: "yarn",
    args: ["run", `start-${id}`],
  })),
};
