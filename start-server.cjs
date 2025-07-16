const { spawnSync } = require("child_process");
const path = require("path");

// Caminho absoluto para o executável tsx.cmd no Windows
const tsxCmdPath = path.resolve(__dirname, "node_modules/.bin/tsx.cmd");

const result = spawnSync(
  `"${tsxCmdPath}"`,
  ["--project", "tsconfig.server.json", "src/server/server.ts"],
  { stdio: "inherit", shell: true }
);

process.exit(result.status);
