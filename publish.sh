#!/bin/bash

if [[ true==true ]]; then
	ECHO "TREU"
fi

if [[ "$1"==null ]]; then
	$1="all"
fi

if [[ "$2"==null ]]; then
	$2 = "auto-publish"
fi

# get current date
date=$(date "+%d.%m.%Y %H:%M")

# TODO funktioniert noch nicht

# go through arguments
if [[ "$1"=="all" ]]; then
	# do everything
	./compile.sh
	./compress.sh
	git add .
	git commit -m "$2"
	git push uber
	return 0
elif [[ "$1"=="posts" ]]; then
	git add _posts/*
	git commit -m "$2"
	git push uber
	return 0
elif [[ "$1"=="css" ]]; then
	./compress.sh
	git add css/*
	git commit -m "$2"
	git push uber
	return 0
elif [[ "$1"=="js" ]]; then
	./compile.sh
	git add js/*
	git commit -m "$2"
	git push uber
	return 0
fi

ECHO "something went wrong"
return -1