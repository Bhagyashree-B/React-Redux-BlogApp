This project is developed by [Afour Technologies](https://afourtech.com/)
# README 

## Table of Content

- [Node.js Setup](#node.js-setup)
- [MongoDB Setup](#mongdb-setup)
- [Code Setup](#code-setup)
   - [Server Setup](#server-setup)
   - [Client Setup](#client-setup)
   - [Test Execution](#test-execution)
   

### Node.js Setup

Download and Install node.js as per your operating system
[Download](https://nodejs.org/en/download/)

### MongoDB Setup

- Download and Install MongoDB as per your operating system
[Download](https://www.mongodb.com/download-center#community)
- Set appropriate path in environment variables
- Use the database using below command
```sh
$ use tms
```
- There will be one collection named **tasks**, once server is started. Please create another collection **users** using below command
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
