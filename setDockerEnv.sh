#!/bin/sh

touch .env
echo "UID=$(id -u $USER)" >> .env
echo "GID=$(id -g $USER)" >> .env
echo "UNAME=$USER" >> .env
echo "MYSQL_ROOT_PASSWORD=password" >> .env
echo "DB_OPEN_PORT=4306" >> .env
echo "TEST_DB_OPEN_PORT=4307" >> .env
echo "MYSQL_PORT=3306" >> .env
echo "CONTAINER_PORT=3000" >> .env
echo "API_PORT=3000" >> .env
echo "FRONT_PORT=8000" >> .env
