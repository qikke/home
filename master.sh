#!/bin/sh
# npm run build:prod
git add .
git commit -m "$*"
git push origin master
