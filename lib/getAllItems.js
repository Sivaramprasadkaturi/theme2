import { GET_ALL_PRODUCTS } from "../preScripts/links";
import { readFile, writeFile } from "./fs-helpers";

// const fetch = require("node-fetch");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const path = require("path");

export default async function getAllItems(useCache = false) {
  let allItems = null;
  let directory = path.resolve(process.cwd(), "./data");
  const cacheFileName = "allProducts_cache.json";
  const cacheFilePath = `${directory}/${cacheFileName}`;

  if (useCache) {
    try {
      allItems = JSON.parse(await readFile(cacheFilePath, "utf8"));
    } catch (err) {
      /* not fatal */
      console.error("products cache file was not found.", err.message);
    }
  }

  if (!allItems) {
    const res = await fetch(GET_ALL_PRODUCTS(1));
    const data = await res.json();

    const items = data && data[1] && data[1].items;

    const pageCount =
      data[0] && data[0].numOfPages && Number(data[0].numOfPages);

    allItems = [...items];

    // fetch other pages
    const promises = Array.from({ length: pageCount }, (_, i) => i + 1)
      .filter(page => page !== 1)
      .map(page => {
        return fetch(GET_ALL_PRODUCTS(page));
      });

    let results = null;

    try {
      results = await promises.reduce(async (promisesArr, currentPromise) => {
        const arr = await promisesArr;
        const res = await currentPromise;
        arr.push(await res.json());
        return arr;
      }, Promise.resolve([]));

      allItems = [
        ...allItems,
        ...results.reduce((a, c) => {
          const items = c && c[1] && c[1].items;
          a.push(...items);
          return a;
        }, [])
      ];
    } catch (error) {
      console.error("error fetching all products", error);
      return [];
    }
  }

  // Write to file cache
  writeFile(cacheFilePath, JSON.stringify(allItems), "utf8").catch(error => {
    console.error("Error writing all items to file", error);
  });

  return allItems;
}
