FROM mysql:5.7

COPY ./data.sql /var/lib/mysql/data.sql

# 2) docker image build -t mydb .
# 3) docker run --name sqldb -e MYSQL_ROOT_PASSWORD=radiohead -d mysql:5.7

## Delete all containers
# docker rm $(docker ps -a -q)
## Delete all images
# docker rmi $(docker images -q)