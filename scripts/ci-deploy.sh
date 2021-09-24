#!/bin/bash

TOKEN=c664146377588dffc7b032fad4cf7f51cfe17f9b

cd ${TRAVIS_BUILD_DIR}

cp ./changelogs/index.html ./dist/
cp ./changelogs/android.png ./dist/
cp ./changelogs/ios.png ./dist/

cd dist
git init
git add --all
git commit -m Deploy
git remote add origin https://dankuanmin:${TOKEN}@github.com/timivietnam/monsy.git
git push origin master --force
