const withPlugins = require("next-compose-plugins");
const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const withFonts = require("next-fonts");
const withTM = require("next-transpile-modules");
const withPWA = require("next-pwa");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withPlugins(
  [
    [
      withTM,
      {
        transpileModules: [
          "react-bulma-components",
        ],
      },
    ],
    [withFonts, {}],
    [
      withCSS,
      {
        webpack: function (config) {
          config.module.rules.push({
            test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
            use: {
              loader: "url-loader",
              options: {
                limit: 100000,
                name: "[name].[ext]",
              },
            },
          });
          return config;
        },
      },
    ],
    [withSass, {}],
    [
      withPWA,
      {
        pwa: {
          disable: process.env.NODE_ENV !== "production",
          dest: "public",
        },
      },
    ],
    [withBundleAnalyzer(), {}],
  ],
  {
    poweredByHeader: false,
  }
);
