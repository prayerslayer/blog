#!/bin/bash

# get current date
date=$(date "+%d.%m.%Y %H:%M")

# go through arguments
if [[ "$0" == "all" ]] then
	# do everything
	./compile.sh
	./compress.sh
	git add .
	git commit -m "auto-publish everything on $date"
	git push uber
	return 0
else if [[ "$0" == "posts" ]] then
		git add _posts/*
		git commit -m "auto-publish new post on $date"
		git push uber
		return 0
	fi
else if [[ "$0" == "css" ]] then
		./compress.sh
		git add css/*
		git commit -m "auto-publish new css on $date"
		git push uber
		return 0
	fi
else 
	if [[ "$0" == "js" ]] then
		./compile.sh
		git add js/*
		git commit -m "autopublish new js on $date"
		git push uber
		return 0
	fi
else
	ECHO "something went wrong"
	return -1
fi