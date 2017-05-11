import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';
import path  from 'path';
import jwt from 'jsonwebtoken';
var cors = require('cors')
const app = express();

app.use(bodyParser.json());
app.use(cors())
const dbUrl = 'mongodb://localhost/crudwithredux';

// app.use(express.static('front-end/public'))
app.use('/static', express.static(path.join(__dirname, 'front-end/public')))

app.set('superSecret', 'myfirstsecret');

function validate(data) {
  let errors = {};
  if (data.title === '') errors.title = "Can't be empty";
  if (data.taskContent === '') errors.taskContent = "Can't be empty";
  const isValid = Object.keys(errors).length === 0
  return { errors, isValid };
}

mongodb.MongoClient.connect(dbUrl, function(err, db) {

  app.post('/api/signup', (req, res) => {
    console.log(req.body)
    const { errors, isValid } = validate(req.body);
    if (isValid) {
      const { name, email, password } = req.body;
      console.log({ name, email, password })
      db.collection('users').insert({ name, email, password }, (err, result) => {
        if (err) {
          res.status(500).json({ errors: { global: "Something went wrong" }});
        } else {
          res.json({ task: result.ops[0] });
        }
      });
    } else {
      res.status(400).json({ errors });
    }
  });

  app.post('/api/login', function(req, res) {
    console.log("auth api called")
    console.log(req.body)
    db.collection('users').findOne({ email: req.body.email }, (err, user) => {
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
            expiresIn: 144000 // expires in 24 hours
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
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

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

  app.get('/api/tasks', (req, res) => {
    db.collection('tasks').find({}).toArray((err, tasks) => {
        if (err) {
          console.log("Something wrong while fetching tasks");
        }else{
            console.log(" \n Fetched all the tasks...\n");
            // console.log(tasks)
            res.json({ tasks });
        }
    });
  });

  app.post('/api/tasks', (req, res) => {
    const { errors, isValid } = validate(req.body);
    if (isValid) {
      const { title, taskContent } = req.body;
      db.collection('tasks').insert({ title, taskContent }, (err, result) => {
        if (err) {
          console.log("500");
          res.status(500).json({ errors: { global: "Something went wrong" }});
        } else {
          console.log("inserted");
          res.json({ task: result.ops[0] });
        }
      });
    } else {
      console.log("400");
      res.status(400).json({ errors });
    }
  });

  app.put('/api/tasks/:_id', (req, res) => {
    const { errors, isValid } = validate(req.body);

    if (isValid) {
      const { title, taskContent } = req.body;
      db.collection('tasks').findOneAndUpdate(
        { _id: new mongodb.ObjectId(req.params._id) },
        { $set: { title, taskContent } },
        { returnOriginal: false },
        (err, result) => {
          if (err) { res.status(500).json({ errors: { global: err }}); return; }

          res.json({ task: result.value });
        }
      );
    } else {
      res.status(400).json({ errors });
    }
  });

  app.get('/api/tasks/:_id', (req, res) => {
    db.collection('tasks').findOne({ _id: new mongodb.ObjectId(req.params._id) }, (err, task) => {
      res.json({ task });
    })
  });

  app.delete('/api/tasks/:_id', (req, res) => {
    db.collection('tasks').deleteOne({ _id: new mongodb.ObjectId(req.params._id) }, (err, r) => {
      if (err) { res.status(500).json({ errors: { global: err }}); return; }

      res.json({});
    })
  });

  app.use((req, res) => {
    res.status(404).json({
      errors: {
        global: "Still working on it. Please try again later when we implement it"
      }
    });
  })

  app.listen(8080, () => console.log('Server is running on localhost:8080'));

});
