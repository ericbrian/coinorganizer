Docker Image & Container
------------------------

```sh
docker pull postgres
docker run --name coindb-dev \
    -e POSTGRES_PASSWORD=mysecretp4ssw*rd \
    -d postgres
```

Backup
------

```sql
pg_dump "${POSTGRES_LOCAL_COINDB}" --column-inserts > numisdb_backup.sql
```

Restore
-------

```sql
psql "${POSTGRES_LOCAL_COINDB}" -f ./numisdb_backup.sql
```

make images.json
----------------

```
cd ../../public/images && ls | jq -R -s -c 'split("\n")[:-1]'>../../app/add-images/images.json
```
