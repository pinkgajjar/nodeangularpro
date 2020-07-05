
## Install mongodb in your system

- OS (ubuntu) https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

- create user using POST [http://localhost:4000/api/register-user] 
- parameters in body : 1. email 
                       2. password
- login using  POST [http://localhost:4000/api/login] 
- parameters in body : 1. email 
                       2. password

## Start Node Server

- Run `npm install` to install required packages 
npm install nodemon --save-dev
- Open terminal run `nodemon`
- Open other terminal run `mongod`

Open API URL on [http://localhost:4000/api](http://localhost:4000/api)
