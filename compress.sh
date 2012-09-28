#!/bin/sh
stylus < css/style.stylus > css/style.css
cat css/bootstrap.css css/fonts.css css/style.css css/bootstrap-responsive.min.css | cleancss -o css/stylesheet.min.css
