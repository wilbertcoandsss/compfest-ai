#!/usr/bin/env bash

exec 3<>/dev/tcp/localhost/6969 || { echo "Failed to connect to localhost on port 6969"; exit 1; }

lines=(
  'POST /pinecone/v1/manage/index/delete HTTP/1.1'
  'Host: localhost'
  'Connection: close'
  ''
)


printf '%s\r\n' "${lines[@]}" >&3


while read -r data <&3; do
  echo "$data"
done

exec 3>&-
exec 3<&-
