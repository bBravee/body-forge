const fs = require("fs");
const path = require("path");
const successColor = "\x1b[32m%s\x1b[0m";
const checkSign = "\u{2705}";
const dotenv = require("dotenv").config({ path: "src/.env" });

const envFile = `export const environment = {
    VARIABLE_NAME: '${process.env.VARIABLE_NAME}',
    OTHER_VARIABLE_NAME: '${process.env.OTHER_VARIABLE_NAME}',
};
`;
const targetPath = path.join(
  __dirname,
  "./src/environments/environment.development.ts"
);
fs.writeFile(targetPath, envFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(
      successColor,
      `${checkSign} Successfully generated environment.development.ts`
    );
  }
});
