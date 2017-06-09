This project is bootstraped by [Afour Technologies](https://afourtech.com/)
# README 

## Table of Content

- [Node.js Setup](#Node.js-Setup)
- [MongoDB Setup](#MongDB-Setup)
- [Code Setup](#Code-Setup)
   - [Server Setup](#Server-Setup)
   - [Client Setup](#Client-Setup)
   - [Test Execution](#Test-Execution)
   

### Node.js Setup

Download and Install node.js as per your operating system
[Download](https://nodejs.org/en/download/)

### MongoDB Setup

- Download and Install MongoDB as per your operating system
[Download](https://www.mongodb.com/download-center#community)
- Set appropriate path in environment variables
- There will be a database with name **crudwithredux**, check using below command on mongodb's console
```sh
$ show databases
```
- Use the database using below command
```sh
$ use crudwithredux
```
- There should be one collection named **tasks**. Please create another collection **users** using below command
```sh
$ db.createCollection("users")
```
- Insert user details in users collection using below command
```sh
$ db.users.insertOne({ name : "john", email: "john@gmail.com", password: "john123"})
```
- Start mongodb, run **mongod.exe** which is present in bin folder where mongodb is installed


## Code Setup
Checkout the code from git repository [Code Repo](https://github.com/Bhagyashree-B/React-Redux-BlogApp.git) on your machine

### Server Setup
Install server dependencies using below steps
- Open commmand prompt and navigate to ProjectPath/server directory
- Run below command 
```sh
$ npm i
```
Wait for few minutes, this will install all the dependencies

- Run below command to start server once all dependencies are installed
```sh
$ npm start
```

### Client Setup
Install client dependencies using below steps
- Open commmand prompt and navigate to ProjectPath/client directory
- Run below command 
```sh
$ npm i
```
Wait for few minutes, this will install all the dependencies

- Run below command to start client once all dependencies are installed
```sh
$ npm start
```

Great Job !!! Your infrastructure is ready.

## Test Execution

- Open command prompt and navigate to ProjectPath/client/src/test
- Run below command
```sh
$ npm test
```
- Validate the test results and code coverage on the command prompt
- Validate the html output of code coverage in ProjectPath/client/coverage/index.html
