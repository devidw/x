#!/bin/bash

check_url() {
  local url=$1
  if curl --head --silent --fail "$url" >/dev/null; then
    echo "1"
  else
    echo "0"
  fi
}

execute_remote_script() {
  curl -sSL $1 -o ./tmp_script_file
  chmod +x ./tmp_script_file
  ./tmp_script_file $rest
  rm ./tmp_script_file
}

if [ -z "$1" ]; then
  echo "set first arg to desired script folder"
  exit 1
fi

rest="${@:2}"

if [ "$D_X" ]; then
  index=$(ls $D_X/$1 | grep index.)
  path="$D_X/$1/$index"
  echo $path

  if [ -f $path ]; then
    # echo "$path $rest"
    chmod +x $path
    $path $rest
    exit $?
  fi
fi

url=https://cdn.jsdelivr.net/gh/devidw/x/$1/index

# could probably be improved by cloning repo locally and use this instead for
# real remote calls, but would be against nature of this thing to run everywhere
# whithout downloading anything
if [ "$(check_url $url.ts)" -eq 1 ]; then
  url="$url.ts"
elif [ "$(check_url $url.sh)" -eq 1 ]; then
  url="$url.sh"
else
  echo "no checked file extension matched"
  exit 1
fi

execute_remote_script $url