#!/usr/bin/env bash

tag="youtube-playlist-sorter:dev"
docker build -t ${tag} .
docker run -it --rm -v `pwd`/src:/app/src --env-file .env ${tag}