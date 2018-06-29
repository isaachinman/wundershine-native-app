export $(egrep -v '^#' .env | xargs)
curl -X GET "$API_ROOT/pb/core-data" > src/core-data.json