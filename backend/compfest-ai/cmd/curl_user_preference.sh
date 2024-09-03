#!/usr/bin/env bash

exec 3<>/dev/tcp/localhost/6969 || { echo "Failed to connect to localhost on port 6969"; exit 1; }

body='
{
  "name": "webe",
  "purpose": "findJob",
  "credentials": "Webeeeee",
  "graduate_level": "undergraduate",
  "preference": "I am a lab assistant that currently focuses on Internet of Things and Data Mining",
  "qualifications": "B.Com",
  "skills": [
    {
      "name": "Prototyping"
    },
    {
      "name": "Digital marketing strategies"
    },
    {
      "name": "Enterprise software systems"
    },
    {
      "name": "Medical knowledge"
    },
    {
      "name": "Empathy"
    },
    {
      "name": "Contract negotiation"
    },
    {
      "name": "Software"
    },
    {
      "name": "Engineering"
    }
  ]
}'

content_length=${#body}

lines=(
  'POST /user/v1/preference HTTP/1.1'
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

