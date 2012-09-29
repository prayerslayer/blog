#!/bin/bash

# get current date
date=$(date "+%d.%m.%Y %H:%M")

# vars
what=""
msg=""

if [[ "$1"!=null ]]; then
	what="$1"
else
	what="all"
fi

if [[ "$2"!=null ]]; then
	msg="$2"
else
	msg="auto-publish"
fi

# go through arguments
if [[ "$what"=="all" ]]; then
	# do everything
	./compile.sh
	./compress.sh
	git add .
	git commit -m "$2"
	git push uber
	ECHO "pushed all: $msg"
	exit 0
elif [[ "$what"=="posts" ]]; then
	git add _posts/*
	git commit -m "$msg"
	git push uber
	ECHO "pushed posts: $msg"
	exit 0
elif [[ "$what"=="css" ]]; then
	./compress.sh
	git add css/*
	git commit -m "$msg"
	git push uber
	ECHO "pushed css: $msg"
	exit 0
elif [[ "$what"=="js" ]]; then
	./compile.sh
	git add js/*
	git commit -m "$msg"
	git push uber
	ECHO "pushed js: $msg"
	exit 0
fi

ECHO "something went wrong"
exit -1