# Derived from official mysql image (our base image)
FROM mysql:5.7
# Update Root user password
ENV MYSQL_ROOT_PASSWORD=root MYSQL_PORT=33306
# Add the content of the sql-scripts/ directory to your image
# All scripts in docker-entrypoint-initdb.d/ are automatically
# executed during container startup
COPY ./db/ /docker-entrypoint-initdb.d/

