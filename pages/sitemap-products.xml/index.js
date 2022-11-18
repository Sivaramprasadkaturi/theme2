import getAllItems from "../../lib/getAllItems";
import { PROJECT_LINK } from "../../project-config";
import { getServerSideSitemap } from "next-sitemap";

const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ctx => {
  let BASE_URL = PROJECT_LINK.replace("/preview", ""); //"http://localhost:3000";

  /*  if (process && process.env.NODE_ENV === "production") {
    BASE_URL = PROJECT_LINK.replace("/preview", "");
  } */

  const useCache = process && process.env.NODE_ENV === "development";

  const allItems = await getAllItems(useCache);

  const allItemUrls = allItems.map(item => `${BASE_URL}/${item}`);

  //console.log("menuJson", menuJson);

  const allPaths = [...allItemUrls];

  const sitemaps = allPaths.map(url => ({
    loc: `${url}`,
    lastmod: new Date().toISOString(),
    priority: 1,
    changefreq: "monthly"
  }));

  return getServerSideSitemap(ctx, sitemaps);

  /*  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths
        .map(url => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `; */

  // This value is considered fresh for ten seconds (s-maxage=10).
  // If a request is repeated within the next 10 seconds, the previously
  // cached value will still be fresh. If the request is repeated before 59 seconds,
  // the cached value will be stale but still render (stale-while-revalidate=59).
  //
  // In the background, a revalidation request will be made to populate the cache
  // with a fresh value. If you refresh the page, you will see the new value.
  /*   if (process && process.env.NODE_ENV === "production") {
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=30, stale-while-revalidate=59"
    );
  } */
  /* res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {}
  }; */
};

export default Sitemap;
