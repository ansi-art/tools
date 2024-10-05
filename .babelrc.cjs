module.exports = {
  "plugins": [
    [
      "@babel/plugin-transform-modules-umd",
      {
        "globals": {
          "@ansi-art/color": "AnsiArtColor",
          "./src/distance.mjs":"AnsiArtDistance"
        }
      }
    ],
    [ "search-and-replace", {
        "rules": [
            {
              "search": /\.mjs/,
              "replace": ".cjs"
            },
            {
              "search": /\.\/src\//,
              "replace": "./dist/"
            }
        ]
    }]
  ]
}