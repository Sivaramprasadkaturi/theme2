const allCategories = require("../preBuildData/menu/urls.json");

const BASE_PATH = "https://b2bndemo1-preview.avetti.io/";
const fs = require("fs");
const generateSiteMap = async (urls, basePath) => {
  const { SitemapStream, streamToPromise } = require("sitemap");
  const { Readable } = require("stream");

  // Create a stream to write to
  const stream = new SitemapStream({ hostname: basePath });

  // Return a promise that resolves with your XML string
  return streamToPromise(Readable.from(urls).pipe(stream)).then(data =>
    data.toString()
  );
};

(async () => {
  try {
    const categoryUrls = allCategories.map(category => {
      return {
        url: `${category.url.toLowerCase()}`,
        changefreq: "monthly",
        priority: 0.7,
        lastmod: new Date().toISOString()
      };
    });

    console.log("categoryUrls", categoryUrls);

    const data = await generateSiteMap(categoryUrls, BASE_PATH);

    fs.writeFile(
      "./public/sitemap-categories.xml",
      data,
      "utf8",
      function (err) {
        if (err) {
          console.log("An error occured while writing sitemap-categories.xml");
          return console.log(err);
        }
        console.log("sitemap-categories.xml file has been written.");
      }
    );
  } catch (err) {
    console.error(
      "Error fetching categories / generating the sitemap-categories.xml",
      err
    );
  }
})();
