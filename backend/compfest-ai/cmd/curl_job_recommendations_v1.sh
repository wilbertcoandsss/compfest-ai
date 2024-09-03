#!/usr/bin/env bash

    # This queries for job recommendations based on
    # the job knowledge base in the "jobs_description" namespace.
    #
    # It takes a JobRequest as an arugment which is a subset of Job,
    # Then turning it a prompt then generates vector embedding based on that prompt,
    # It queries to the database and recommends similar jobs of k amount 
    #
    # It returns a list of Job with its corresponding id and score.
    # Score determines the similarity to the given input.

exec 3<>/dev/tcp/localhost/6969 || { echo "Failed to connect to localhost on port 6969"; exit 1; }

body='
{
  "qualifications": "M.Tech",
  "salary_range": "$120k",
  "preference": "I am a backend engineer with extensive experience up to 8 years. I create scalable systems and manage servers.",
  "skills": [
      {
          "name": "Python"
      },
      {
          "name": "System Architecture"
      },
      {
          "name": "Network Administration"
      }
  ]
}
'

content_length=${#body}

lines=(
  'POST /job/v1/recommendations HTTP/1.1'
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


# [
#   {
#     'id': 'def39ff2-1785-4304-ba6b-a41ef879cbd3', 
#     'job': {'name': 'Systems Engineer', 
#     'role': 'Cloud Systems Engineer', 
#     'experience': '4 to 9 Years', 
#     'qualifications': 'B.Tech', 
#     'salary_range': '$57K-$106K', 
#     'description': 'As a Cloud Systems Engineer, you will be responsible for designing, implementing, and managing cloud infrastructure solutions. You will work with cloud platforms like AWS, Azure, or GCP to build scalable and reliable systems. Your role involves optimizing cloud resources, ensuring security, and troubleshooting issues to maintain high system availability and performance.', 
#     'skills': [
#       {
#         'name': 'Cloud systems engineering Cloud infrastructure (e.g., AWS, Azure) DevOps practices Automation Security in the cloud Disaster recovery Scalability'
#       }
#       ]
#     }, 
#     'score': 0.99771756
#   }
# ]

