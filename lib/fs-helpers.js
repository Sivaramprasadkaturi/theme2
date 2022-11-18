const fs = require("fs");
const { promisify } = require("util");

export const readFile = promisify(fs.readFile);
export const writeFile = promisify(fs.writeFile);
