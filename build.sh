#!/bin/bash

JSMIN="/usr/local/bin/jsmin"
IN="./src"
OUT="./dist"

for source in $(ls ${IN}/*.js); do

    filename=$(basename "${source}" | sed -e "s/.js$//g")
    destination="${OUT}/${filename}.min.js"

    ${JSMIN} "${source}" > "${destination}"

done
