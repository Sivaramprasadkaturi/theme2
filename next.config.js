const { i18n } = require("./next-i18next.config");
// const runtimeCaching = require("next-pwa/cache");
// const withPWA = require("next-pwa")({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
//   runtimeCaching,
//   buildExcludes: [/middleware-manifest.json$/]
// });

module.exports =
  /*  withPWA( */
  {
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true
    },
    i18n,
    compiler: {
      styledComponents: true
    },
    // target: "experimental-serverless-trace", ***deprecated
    webpack: (config, { isServer }) => {
      config.module.rules.push({
        test: /\.mp3$/,
        use: {
          loader: "file-loader"
        }
      });
      if (!isServer) {
        config.resolve.fallback.fs = false;
      }
      return config;
    },
    env: {
      VID: 20210528108,
      PER_PAGE: 15,
      IS_PUBLISHED: false,
      PREVIEW_PROJECT_LINK: "https://b2bndemo1-preview.avetti.io/preview",
      PUBLISH_PROJECT_LINK: "https://b2bndemo1-preview.avetti.io",
      GOOGLE_MAPS_KEY: "AIzaSyAcPm0gefk_kjA0rgxtytc8L5abf2o69ls",
      NEXT_AVETTI_CMS: "https://cms.avetti.io",
      WEGLOT_KEY: "wg_d6532134bda8db3699591ba1d83ed48c7",
      NEXT_PUBLIC_GRAPHQL_ENDPOINT:
        "b2bnstartermarketplace-preview.avetti.io/preview/graphql2"
    },
    images: {
      domains: ["ik.imagekit.io", "b2bndemo1-preview.avetti.io"]
    }
  };
/* ); */
