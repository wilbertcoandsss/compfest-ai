#!/usr/bin/env bash

    # This queries for job recommendations based on
    # the job knowledge base in the "jobs_description" namespace.
    #
    # Takes in userId as an argument.
    # Queries that userId into the "user_preference" namespace
    #
    # It takes in the metadata then creates a prompt
    # 
    # The prompt will the be used to query the job knowledge base in the "job_descriptions" namespace
    #
    # Returns a list of Job

exec 3<>/dev/tcp/localhost/6969 || { echo "Failed to connect to localhost on port 6969"; exit 1; }


content_length=${#body}

lines=(
  'GET /job/v2/recommendations/Webeeeee HTTP/1.1'
  'Host: localhost'
  'Connection: close'
  ''
)


printf '%s\r\n' "${lines[@]}">&3

while read -r data <&3; do
  echo "$data"
done

exec 3>&-
exec 3<&-


# {
#   "response": [
#     {
#       "id": "111f0e26-20d7-45ea-bb65-ec9773451835",
#       "job": {
#         "description": "Research Psychologists conduct psychological research to advance the fields understanding. They design studies, collect data, and analyze results to inform scientific knowledge.",
#         "experience": "2 to 12 Years",
#         "name": "Psychologist",
#         "qualifications": "MBA",
#         "role": "Research Psychologist",
#         "salary_range": "$57K-$83K",
#         "skills": [
#           {
#             "name": "Research methodology"
#           },
#           {
#             "name": "Data analysis"
#           },
#           {
#             "name": "Psychological studies"
#           },
#           {
#             "name": "Writing research reports"
#           },
#           {
#             "name": "Critical thinking"
#           },
#           {
#             "name": "Quantitative Research"
#           },
#           {
#             "name": "Statistical Software"
#           },
#           {
#             "name": "Survey Design"
#           },
#           {
#             "name": "Experimental Design"
#           },
#           {
#             "name": "Academic Writing"
#           },
#           {
#             "name": "Data Presentation"
#           },
#           {
#             "name": "SPSS"
#           },
#           {
#             "name": "Qualitative Research"
#           },
#           {
#             "name": "Ethics in Research"
#           },
#           {
#             "name": "Problem Solving"
#           }
#         ]
#       },
#       "score": 0.9962282
#     },
#   ]
# }
