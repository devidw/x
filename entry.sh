#!/bin/bash

# prio 1 is local, remote is prio 2

if [ -z "$1" ]; then
  echo "set first arg to desired script folder"
  exit 1
fi

rest="${@:2}"

if [ "$D_X" ]; then
  path="$D_X/$1/index"

  if [ -f "$path.ts" ]; then
    echo $path
    deno run -A $path.ts $rest
    exit $?
  elif [ -f "$path.sh" ]; then
    echo $path
    bash $path.sh
    exit $?
  fi
fi

check_url() {
  local url=$1
  if curl --head --silent --fail "$url" >/dev/null; then
    echo "1"
  else
    echo "0"
  fi
}

url=https://cdn.jsdelivr.net/gh/devidw/x/$1/index
echo $url

if [ "$(check_url $url.ts)" -eq 1 ]; then
  deno run -A $url.ts $rest
elif [ "$(check_url $url.sh)" -eq 1 ]; then
  curl -sSL $url.sh | bash
fi