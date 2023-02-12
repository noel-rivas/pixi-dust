const fs = require('fs');
var mix = require('laravel-mix');
let productionSourceMaps = true;

// REMEMBER:
// To user browser sync, first start a web server.
// You can use 
// python3 -m http.server
mix.browserSync({proxy: {target: 'http://localhost:8000'}, port: 8000});

mix.js('src/app.js', 'dist')
  .setPublicPath('dist')
  .sourceMaps(productionSourceMaps, 'source-map');
