FROM nginx:alpine

# Install envsubst (from gettext) for variable substitution
RUN apk add --no-cache gettext

# Copy built React app
COPY build/ /usr/share/nginx/html

# Copy NGINX config template instead of final config
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Copy entrypoint script
COPY entrypoint.sh /docker-entrypoint.d/entrypoint.sh
RUN chmod +x /docker-entrypoint.d/entrypoint.sh

# Let NGINX start normally
CMD ["nginx", "-g", "daemon off;"]
