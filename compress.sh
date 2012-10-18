#!/bin/sh
stylus < css/style.stylus > css/style.css
cat  css/normalize.css css/simplegrid.css css/fonts.css css/style.css > css/stylesheet.css
cleancss -o css/stylesheet.min.css css/stylesheet.css