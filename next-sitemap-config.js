/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://b2bndemo1-preview.avetti.io",
  generateRobotsTxt: true,
  sitemapSize: 500,
  exclude: [
    "/sitemap-products.xml",
    "/sitemap-categories.xml",
    "/search",
    "/basket"
  ], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://b2bndemo1-preview.avetti.io/sitemap-products.xml",
      "https://b2bndemo1-preview.avetti.io/sitemap-categories.xml" // <==== Add here
    ]
  }
};
