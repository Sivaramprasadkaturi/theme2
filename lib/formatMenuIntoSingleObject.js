import { readFile, writeFile } from "./fs-helpers";
const path = require("path");

let dataFoundInCache = false;
let directory = path.resolve(process.cwd(), "./data");
const cacheFileName = "allCategories_cache.json";
const cacheFilePath = `${directory}/${cacheFileName}`;

export default async function formatMenuIntoSingleObject(
  menu,
  useCache = false,
  ingoreChilds = false
) {
  // iterate through the menu and it's children
  // this array will be used to create the menu object

  let allCategories = null;

  if (useCache) {
    try {
      allCategories = JSON.parse(await readFile(cacheFilePath, "utf8"));
      dataFoundInCache = true;
    } catch (err) {
      /* not fatal */
      console.error("all categories cache file was not found.", err);
    }
  }

  if (!allCategories) {
    allCategories = {};
    menu.childs.forEach(cat => {
      const URL = cat.URL.toLowerCase().replace(/\/\s*$/, "");

      let copyCat = Object.assign({}, cat);
      if (!ingoreChilds) delete copyCat.childs;

      allCategories[URL] = copyCat;

      if (!ingoreChilds) getChildCategories(allCategories, cat, ingoreChilds);
    });
  }

  if (!dataFoundInCache && useCache) {
    writeFile(cacheFilePath, JSON.stringify(allCategories), "utf8")
      .then(() => {
        console.log("allCategories cache file was written.");
      })
      .catch(error => {
        console.error("Error writing all categories to file", error);
      });
  }

  return allCategories;
}

const getChildCategories = async (allCategories, cat, ingoreChilds) => {
  if (cat.childs.length > 0) {
    cat.childs.forEach(async (child, i) => {
      const URL = child.URL.toLowerCase().replace(/\/\s*$/, "");

      let copyCat = Object.assign({}, child);
      if (!ingoreChilds) delete copyCat.childs;

      allCategories[URL] = copyCat;
      if (!ingoreChilds) getChildCategories(allCategories, child);
    });
  }
};

export const getCategoryFromURL = async URL => {
  let allCategories = null;
  try {
    allCategories = JSON.parse(await readFile(cacheFilePath, "utf8"));
  } catch (err) {
    /* not fatal */
    console.error(
      "<< NOT FATAL: all categories cache file was not found.",
      err
    );
  }

  if (allCategories && allCategories[URL]) {
    return allCategories[URL];
  } else return null;
};
