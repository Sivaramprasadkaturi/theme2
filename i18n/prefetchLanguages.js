/*
 * Avetti Commerce
 * NOTICE OF LICENSE
 * This source file is subject to the Avetti Enterprise License (AEL 1.20)
 * that is bundled with this package in the file AELICENSE.txt.
 * Copyright (c) 2021. Avetti.com Corporation. (http://ww.avetticommerce.com)
 * License:   Avetti Enterprise License (AEL 1.20)
 * COPYRIGHT Avetti.com Corporation 1998-2021.  All Rights Reserved
 */

require("dotenv").config({
  path: `.env`
});

const fs = require("fs");
const { getTheDataFromSpreadSheet } = require("./utils");
const { fromPairs } = require("lodash/array");

console.log(
  "NEXT_PUBLIC_AVAILABLE_LANGUAGES",
  process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES
);
//LANGUAGE PREFETCH FUNCTIONALITY
const languagesList = process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES
  ? process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES.split(",")
  : ["en", "es"];

const replacements = {
  "\\u00F1": "ñ",
  "\\u00ED": "í",
  "\\u00F3": "ó",
  "\\u00E1": "á",
  "\\u00FA": "ú"
};
const replacement_regex = new RegExp(
  Object.keys(replacements)
    // escape any regex literals found in the replacement keys:
    .map(e => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|"),
  "g"
);
languagesList.forEach(async el => {
  try {
    let { values } = await getTheDataFromSpreadSheet(el);
    if (el === "es") {
      values = values.map(e => [
        e[0],
        e[1].replace(replacement_regex, e => replacements[e])
      ]);
    }

    const jsonToWrite = fromPairs(values);
    const dir = `./public/locales/${el}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFile(
      `./public/locales/${el}/translation.json`,
      JSON.stringify(jsonToWrite),
      err => {
        if (err) {
          console.error(`Failed to stringify JSON`, err);
          throw err;
        }
      }
    );
  } catch (error) {
    console.error(`Error while fetching and converting languages: ${error}`);
  } finally {
    console.log(`Language ${el.toUpperCase()} was downloaded`);
  }
});
