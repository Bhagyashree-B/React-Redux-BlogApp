// Import GraphQL and destructure for easy access
import {
  GraphQLObjectType,
  GraphQLSchema
 } from 'graphql'

// Import express server
import express from 'express'
var cors = require('cors')

// Import mongoose to connect to MongoDB
import mongoose from 'mongoose'

// Import express-graphql an easy express integration of https://github.com/graphql/graphiql
import graphqlHTTP from 'express-graphql'

// Import GraphQL Queries
import taskQueries from './models/task/taskQueries'

// Import GraphQL Mutations
import taskMutations from './models/task/taskMutations'

import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';

import user from './models/user/userType'

// Setup GraphQL RootQuery
let RootQuery = new GraphQLObjectType({
  name: 'Query',
  description: 'Realize Root Query',
  fields: () => ({
    task: taskQueries.task,
    tasks: taskQueries.tasks,
    taskId: taskQueries.taskId,
    taskByName: taskQueries.taskByName,
    chartByCategory: taskQueries.chartByCategory
  })
})

// Setup GraphQL RootMutation
let RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Realize Root Mutations',
  fields: () => ({
    addTask: taskMutations.addTask,
    updateTask: taskMutations.updateTask,
    deleteTask: taskMutations.deleteTask
  })
})

// Set up GraphQL Schema with our RootQuery and RootMutation
let schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})

// Connect MongoDB with Mongoose
mongoose.connect('mongodb://localhost/crudwithredux')

// Set up Express and integrate with our GraphQL Schema and configure to use graphiql
var app = express()
app.use(cors())
app.use(bodyParser.json());
app.set('superSecret', 'myfirstsecret');

app.post('/api/login', function(req, res) {
  console.log("auth api called")
  console.log(req.body)
  user.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;
    console.log(user)
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 1440 // expires in 24 hours
        });

        delete user.password
        // return the information including token as JSON
        res.json({
          user: user,
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }
  })
});

// route middleware to verify a token
app.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.headers['x-access-token'];
  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});

app.use('/graphql', graphqlHTTP({ schema: schema, graphiql: true }))
app.listen('8080')

var status = {
  Express: {
    "Online": true,
    "Port": 3000
  },
  "GraphiQL": {
    "url": "http://localhost:8080/graphql"
  }
}
console.dir(status, {depth: null, colors: true })
