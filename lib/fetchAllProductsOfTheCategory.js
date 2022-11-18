// import { data } from "autoprefixer";
import { VID } from "../project-config";
import { CATEGORY_PAGING_FETCH_LINK } from "../redux/links";
import { readFile, writeFile } from "./fs-helpers";

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const path = require("path");

export default async function fetchAllProductsOfTheCategory(
  category,
  useCache = false,
  locale
) {
  const cid = category.cid;
  let dataFoundInCache = false;
  let allProductsOfTheCategory = null;
  let directory = path.resolve(process.cwd(), "./data");
  const cacheFileName = "allProductsOfTheCategory_cache.json";
  const cacheFilePath = `${directory}/${cacheFileName}`;

  if (useCache) {
    try {
      allProductsOfTheCategory = JSON.parse(
        await readFile(cacheFilePath, "utf8")
      );
      dataFoundInCache = allProductsOfTheCategory[cid];
      if (dataFoundInCache) {
        console.log("all products of the category data found in cache.");
      }
    } catch (err) {
      /* not fatal */
      console.error(
        "all products of the category data cache file was not found."
      );
    }
  }

  if (!allProductsOfTheCategory || !allProductsOfTheCategory[cid]) {
    const URL = `${process.env.PREVIEW_PROJECT_LINK}/store.html?vid=${VID}&cid=${cid}&tpt=json_${locale}&mpv=childItemsDTO&mpvp=1&pageItemsCount=1000`;
    // CATEGORY_PAGING_FETCH_LINK({ cid });
    console.log("URL2", URL);

    try {
      const res = await fetch(URL);
      const data = await res.json();
      const productUrls = data[1].items.map(product => {
        return { url: product.url, id: product.id };
      });
      if (allProductsOfTheCategory === null) allProductsOfTheCategory = {};

      allProductsOfTheCategory = {
        ...allProductsOfTheCategory,
        [cid]: { productUrls, categoryUrl: category.URL }
      };
    } catch (err) {
      console.error("Error fetching all products of the category", err);
    }
  }

  // Write to file cache
  if (!dataFoundInCache && useCache) {
    writeFile(
      cacheFilePath,
      JSON.stringify(allProductsOfTheCategory),
      "utf8"
    ).catch(error => {
      console.error(
        "Error writing all products of the category data to file",
        error
      );
    });
  }
  return allProductsOfTheCategory[cid];
}
