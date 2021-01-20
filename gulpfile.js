const { watch, src, dest, series, parallel } = require('gulp');
const server = require('browser-sync').create();
const fs = require('fs');
const rev = require('gulp-rev');
const revRewrite = require('gulp-rev-rewrite');
const fileInclude = require('gulp-file-include');
const del = require('del');

// clean folder dist
const clean = () => del(['./dist']);

// run browser sync
function reload() {
  server.reload();
}

function includeHtml() {
  return src([
    './src/*.html',
    '!./src/includes/*.html'
  ])
    .pipe(fileInclude())
    .pipe(dest('./dist'));
}

async function copyAssets() {
  return src([
    './src/assets/**/*'
  ])
    .pipe(dest('./dist/assets'));
}

async function buildAndReload() {
  await includeHtml();
  await copyAssets();
  reload();
}

exports.default = async function() {
  server.init({
    server: {
      baseDir: './dist'
    }
  })
  buildAndReload();
  watch(
    ['./src/*.html','./src/includes/*.html','./src/assets/**/*'],
    series(clean,buildAndReload)
  );
}

// Create hash for cache js and css file

// Step 1
function revision() {
  return src('dist/assets/**/*.{css,js}')
    .pipe(rev())
    .pipe(dest('dist/assets'))
    .pipe(rev.manifest())
    .pipe(dest('dist/assets'));
}

// Step 2
function rewrite() {
  const manifest = fs.readFileSync('dist/assets/rev-manifest.json');

  return src('dist/**/*.html')
    .pipe(revRewrite({ manifest }))
    .pipe(dest('dist'));
}

// Run 'gulp build' for deploying to production
exports.build = series(revision, rewrite);
