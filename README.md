```

docker run --name stationF_mysql -p 3306:3306 -d -v "${PWD}/mysql/storage":/var/lib/mysql -e MYSQL_ROOT_PASSWORD=mysql_pass -e MYSQL_DATABASE=stationf mysql
```
