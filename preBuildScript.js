require("dotenv").config({
  path: `.env`
});

const fs = require("fs");
const path = require("path");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const PREVIEW_PROJECT_LINK = process.env.NEXT_PUBLIC_PREVIEW_PROJECT_LINK;
const PUBLISH_PROJECT_LINK = process.env.NEXT_PUBLIC_PUBLISH_PROJECT_LINK;
const IS_PUBLISHED =
  process.env.NEXT_PUBLIC_IS_PUBLISHED == "true" ? true : false;

const PROJECT_LINK = IS_PUBLISHED ? PUBLISH_PROJECT_LINK : PREVIEW_PROJECT_LINK;
const VID = process.env.NEXT_PUBLIC_VID;

const menuUrl = `${PROJECT_LINK}/uservices/1.0.2/menu/${VID}/category/Shop/lang/en/`;

console.log("menuUrl", menuUrl);

let urls = [];

const urlsSeparated = payload => {
  payload.map(child => {
    // if (child.childs.length === 0) {
    urls.push({
      url: child.URL,
      id: child.cid
    });
    // }
    if (child.childs.length > 0) {
      return urlsSeparated(child.childs);
    }
  });
};

const filterData = payload => {
  payload.filter(child => {
    urls.push({
      url: child.URL,
      id: child.cid
    });
    if (child.childs.length > 0) {
      return urlsSeparated(child.childs);
    }
  });
};

const loadMenu = async () => {
  try {
    const res = await fetch(menuUrl);
    const data = await res.json();

    await fs.writeFileSync(
      path.resolve(process.cwd(), "./preBuildData/menu/menu.json"),
      JSON.stringify(data)
    );
    urlsSeparated(data.childs);

    await fs.writeFileSync(
      path.resolve(process.cwd(), "./preBuildData/menu/urls.json"),
      JSON.stringify(urls)
    );
  } catch (error) {
    console.log({ error });
  }
};

loadMenu();
