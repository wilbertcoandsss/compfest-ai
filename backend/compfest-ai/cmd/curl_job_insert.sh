#!/usr/bin/env bash

exec 3<>/dev/tcp/localhost/6969 || { echo "Failed to connect to localhost on port 6969"; exit 1; }

body='
{
  "name": "Frontend Developer",
  "role": "UI Developer",
  "experience": "3 to 5 years",
  "salary_range": "$50,000 - $70,000",
  "description": "Creating beautiful UI",
  "qualifications": "M.Tech",
  "skills": [
      {
          "name": "React"
      },
      {
          "name": "Javascript"
      }
  ]
}
'

content_length=${#body}

lines=(
  'POST /pinecone/v1/job/insert HTTP/1.1'
  'Host: localhost'
  'Content-Type: application/json'
  "Content-Length: $content_length"
  'Connection: close'
  ''
)

printf '%s\r\n' "${lines[@]}" >&3
printf '%s\r\n' "$body" >&3

while read -r data <&3; do
  echo "$data"
done

exec 3>&-
exec 3<&-