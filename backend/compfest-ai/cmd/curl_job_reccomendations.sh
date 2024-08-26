#!/usr/bin/env bash

exec 3<>/dev/tcp/localhost/6969 || { echo "Failed to connect to localhost on port 6969"; exit 1; }

body='
{
  "qualifications": "M.Tech",
  "salary_range": "$30k",
  "preference": "i like designing and creating websites",
  "skills": [
      {
          "name": "Javascript"
      },
      {
          "name": "Typescript"
      },
      {
          "name": "React"
      }
  ]
}
'

content_length=${#body}

lines=(
  'POST /pinecone/v1/job/reccomendations HTTP/1.1'
  'Host: localhost'
  'Content-Type: application/json'
  "Content-Length: $content_length"
  'Connection: close'
  ''
)


printf '%s\r\n%s\r\n' "${lines[@]}" "$body" >&3

while read -r data <&3; do
  echo "$data"
done

exec 3>&-
exec 3<&-

