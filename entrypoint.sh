#!/bin/sh

echo "Generating NGINX config from template..."
envsubst '${REACT_APP_API_URI}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"
