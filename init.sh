#!/bin/bash
echo 'init & install...'

echo 'install gulp...'
npm install gulp --save-dev

echo 'install gulp-uglify...'
npm install gulp-uglify --save-dev

echo 'install gulp-concat...'
npm install gulp-concat --save-dev

echo 'install gulp-sass...'
npm install gulp-sass --save-dev

echo 'install gulp-rimraf...'
npm install gulp-rimraf --save-dev

echo 'install gulp-rev-collector...'
npm install gulp-rev-collector

echo 'install gulp-connect...'
npm install gulp-connect

echo 'install gulp-template...'
npm install gulp-template

echo 'install gulp-sourcemaps...'
npm install gulp-sourcemaps

echo 'install gulp in global..'
npm install -g gulp
