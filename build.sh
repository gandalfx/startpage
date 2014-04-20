#!/bin/bash
set -e

# config
debug=true

# cli
while getopts "dx" option ; do
    case $option in
        "d") debug=true ;;
        "x") debug=false ;;
    esac
done

# cleanup
rm -v min/*

# less -> css
if $debug ; then
    echo "compiling uncompressed css ..."
    lessc src/global.less >> min/min.css
else
    echo "compiling minified css ..."
    lessc -x src/global.less >> min/min.css
fi

# js
for s in init core style search menu picture # xkcd
do
    if [ -f "src/$s.js" ] ; then
        if $debug ; then
            echo "copying src/$s.js ..."
            cat "src/$s.js" >> min/min.js
        else
            echo "yui-compressing src/$s.js ..."
            yui-compressor "src/$s.js" >> min/min.js
        fi
    fi
done
