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
rm -fv *min.*

# less -> css
if $debug ; then
    echo "compiling uncompressed css ..."
    lessc global.less >> min.css
else
    echo "compiling minified css ..."
    lessc -x global.less >> min.css
fi

# js
for s in init core style search menu picture # xkcd
do
    if [ -f $s".js" ] ; then
        if $debug ; then
            echo "copying $s.js ..."
            cat $s".js" >> min.js
        else
            echo "yui-compressing $s.js ..."
            yui-compressor $s".js" >> min.js
        fi
    fi
done
