# Kalle Bornemark Resume (API)

This project is built with the following techniques:
* AdonisJs (which is built on Node.js)
* PostgreSQL

# Get started
⚠ First, make sure `.env` and `.env.testing` are set up with environment variables
### Start a PostgreSQL Docker container
```
docker run -d --name my_postgres -v my_dbdata:/var/lib/postgresql/data -p 5432:5432 postgres:11
```
### Install packages
```
npm i
```
### Start dev server
```
npm run start
```
### Run tests
```
npm run test
```

# Copy production database to local database
You probably want some data to work with locally. To get this, we can copy the production data from Heroku.
1. Capture and download a dump of the current production database (requires the Heroki CLI to be installed)
```
heroku pg:backups:capture
heroku pg:backups:download
```
2. Load the dump into your local database (requires Postgres to be installed: `brew install postgres`)
```
pg_restore --verbose --clean --no-acl --no-owner -h localhost -U <database_user> -d <database_name> latest.dump
```

## License

MIT © Kalle Bornemark
