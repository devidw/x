#!/bin/bash

# prio 1 is local, remote is prio 2

rest="${@:2}"

if [ "${D_X}" ]; then
  path="$D_X/$1/index.ts"

  if [ -d $path ]; then
    echo "run from local"
    deno run -A $path $rest
    exit $?
  fi
fi

echo "run from remote"
deno run -A https://cdn.jsdelivr.net/gh/devidw/x/$1/index.ts $rest