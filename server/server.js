import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';
import path  from 'path';
import jwt from 'jsonwebtoken';

const app = express();
app.use(bodyParser.json());
const dbUrl = 'mongodb://localhost/crudwithredux';

// app.use(express.static('front-end/public'))
app.use('/static', express.static(path.join(__dirname, 'front-end/public')))

app.set('superSecret', 'myfirstsecret');

function validate(data) {
  let errors = {};
  if (data.title === '') errors.title = "Can't be empty";
  if (data.postContent === '') errors.postContent = "Can't be empty";
  const isValid = Object.keys(errors).length === 0
  return { errors, isValid };
}

mongodb.MongoClient.connect(dbUrl, function(err, db) {

  app.post('/api/signup', (req, res) => {
    const { errors, isValid } = validate(req.body);
    if (isValid) {
      const { name, email, password } = req.body;
      db.collection('users').insert({ name, email, password }, (err, result) => {
        if (err) {
          res.status(500).json({ errors: { global: "Something went wrong" }});
        } else {
          res.json({ post: result.ops[0] });
        }
      });
    } else {
      res.status(400).json({ errors });
    }
  });

  app.post('/api/authenticate', function(req, res) {

    db.collection('users').findOne({ name: req.body.name }, (err, post) => {
      if (err) throw err;

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
            expiresInMinutes: 1440 // expires in 24 hours
          });

          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }   

      }
    })
  });

  app.get('/api/posts', (req, res) => {
    db.collection('posts').find({}).toArray((err, posts) => {
      res.json({ posts });
    });
  });

  app.post('/api/posts', (req, res) => {
    const { errors, isValid } = validate(req.body);
    if (isValid) {
      const { title, postContent } = req.body;
      db.collection('posts').insert({ title, postContent }, (err, result) => {
        if (err) {
          res.status(500).json({ errors: { global: "Something went wrong" }});
        } else {
          res.json({ post: result.ops[0] });
        }
      });
    } else {
      res.status(400).json({ errors });
    }
  });

  app.put('/api/posts/:_id', (req, res) => {
    const { errors, isValid } = validate(req.body);

    if (isValid) {
      const { title, postContent } = req.body;
      db.collection('posts').findOneAndUpdate(
        { _id: new mongodb.ObjectId(req.params._id) },
        { $set: { title, postContent } },
        { returnOriginal: false },
        (err, result) => {
          if (err) { res.status(500).json({ errors: { global: err }}); return; }

          res.json({ post: result.value });
        }
      );
    } else {
      res.status(400).json({ errors });
    }
  });

  app.get('/api/posts/:_id', (req, res) => {
    db.collection('posts').findOne({ _id: new mongodb.ObjectId(req.params._id) }, (err, post) => {
      res.json({ post });
    })
  });

  app.delete('/api/posts/:_id', (req, res) => {
    db.collection('posts').deleteOne({ _id: new mongodb.ObjectId(req.params._id) }, (err, r) => {
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
