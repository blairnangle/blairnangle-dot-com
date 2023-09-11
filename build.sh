#!/bin/bash

APP="$1"

if [[ "website" == "${APP}" ]]; then
  npm exec gatsby build
  elif [[ "brain" == "${APP}" ]]; then
  npm exec quartz build
  else
  echo "Unknown app: ${APP}"
  exit 1
fi
