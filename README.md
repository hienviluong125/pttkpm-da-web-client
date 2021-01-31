# pttkpm-da-web
# ---------------------------------------------
# Client app

# how to run on local development ?

# npm run serve

# ----------------------------------------------
# Backend api
# create an '.env' file on root directory please check env.sample file to get correct format
- DB_USER=postgres
- DB_PASSWORD=123456
- DB_NAME_DEVELOPMENT=qlpg_development
- DB_NAME_TEST=qlpg_test
- DB_NAME_PRODUCTION=qlpg_production
- DB_PORT=5432
- DB_HOST=localhost
- PORT=3000
- JWT_KEY=yourkey

# how to install and init database ?

- npm install
- npm install --save-dev sequelize-cli
- npx sequelize-cli db:drop ( if you want to clear previous database )
- npx sequelize-cli db:create
- npx sequelize-cli db:migrate

# how to run project ?

- npm run start
- visit localhost:3000

# how to create fake datas

- node seed.js ( make sure server is not running )  
note: `node seed.js` cmd will delete all existing records and re-generate new records
