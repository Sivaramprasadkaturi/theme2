// import { data } from "autoprefixer";
import { CATEGORY_PAGING_FETCH_LINK } from "../redux/links";
import { readFile, writeFile } from "./fs-helpers";

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const path = require("path");

export default async function fetchCategoryData(
  category,
  useCache = false,
  locale
) {
  const cid = category.cid;
  let dataFoundInCache = false;
  let allCategoryData = null;
  let directory = path.resolve(process.cwd(), "./data");
  const cacheFileName = "allCategoryData_cache.json";
  const cacheFilePath = `${directory}/${cacheFileName}`;

  if (useCache) {
    try {
      allCategoryData = JSON.parse(await readFile(cacheFilePath, "utf8"));
      dataFoundInCache = allCategoryData[cid];
      if (dataFoundInCache) {
        console.log("all category data found in cache.");
      }
    } catch (err) {
      /* not fatal */
      console.error("all category data cache file was not found.");
    }
  }

  if (!allCategoryData || !allCategoryData[cid]) {
    const URL = CATEGORY_PAGING_FETCH_LINK({ cid, lang: locale });
    console.log("URL22", URL);
    const res = await fetch(URL);
    const data = await res.json();

    if (allCategoryData === null) allCategoryData = {};

    allCategoryData = { ...allCategoryData, [cid]: data };
  }

  // Write to file cache
  if (!dataFoundInCache && useCache) {
    writeFile(cacheFilePath, JSON.stringify(allCategoryData), "utf8").catch(
      error => {
        console.error("Error writing all category data to file", error);
      }
    );
  }
  return allCategoryData[cid];
}
