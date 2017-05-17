import mongoose from 'mongoose';
import user from '../user/userType'
var ObjectId = require('mongodb').ObjectID;

var taskSchema = new mongoose.Schema({
  id: { type:String, required:true, unique:true, index:true, default:mongoose.Types.ObjectId },
  userId: { type:String, required:true, default:mongoose.Types.ObjectId },
  title: String,
  category: String,
  startDate: String,
  dueDate: String,
  taskContent: String
});

let task = mongoose.model('task', taskSchema);

module.exports = task;

module.exports.getListOfTasks = (root, {userId}) => {
  return new Promise((resolve, reject) => {
    task.find({ "userId" : userId}).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

module.exports.getTaskById = (root, {id}) => {
  return new Promise((resolve, reject) => {
    task.findOne({
        id: id
    }).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

module.exports.getTaskByName = (root, {title}) => {
  return new Promise((resolve, reject) => {
    task.findOne({
      title: title
    }).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

module.exports.getTaskByPosition = (root, {id}) => {
  return new Promise((resolve, reject) => {
    task.find({}).exec((err, res) => {
      err ? reject(err) : resolve(res[id]);
    });
  });
};

module.exports.getChartDataByCategory = (root, {userId}) => {
  var dataBycategory = new Promise((resolve, reject) => {
      task.aggregate(
        {$match : {userId : userId}},
        {$group:{_id: '$category', count:{$sum:1}}},
        {$project:{tmp:{category:'$_id', count:'$count'}}},
        {$group:{_id:null, total:{$sum:'$tmp.count'}, data:{$addToSet:'$tmp'}}}
      ).exec((err, res) => {
      err ? reject(err) : resolve(res[0]);
    });
  });

  var p2 = new Promise((resolve, reject) => {
      task.aggregate(
        {$group:{ _id: '$userId', count:{$sum:1}}},
        {$project:{ userId:'$_id', count:'$count'}}
      ).exec((err, res) => {
        if(err) {
          reject(err)
        } else {
          let x_esponse = []
          res.map( item => {
            x_esponse.push(user.findOne({ _id: ObjectId(item.userId) }, (err, u) => {
                if(u){
                  item.userName = u.name
                }
              })
            )
          })
          Promise.all(x_esponse).then(()=>
            resolve(res)
          )
        }
    });
  });

  return Promise.all([dataBycategory, p2]).then(values => {
    let res = { dataBycategory : values[0], allData : values[1]}
    console.log(res); // [dataBycategory, p2]
    return res;
  });
};

module.exports.addTask = (root, {userId, title, category, startDate , dueDate , taskContent }) => {
  var newTask = new task({userId: ObjectId(userId), title:title, category:category, startDate:startDate, dueDate:dueDate, taskContent:taskContent});

  return new Promise((resolve, reject) => {
    newTask.save((err, res) => {
      err ? reject(err): resolve(res);
    });
  });
}

module.exports.updateTask = (root, {id, title, category, startDate , dueDate , taskContent }) => {
  var updateTask = {title:title, category:category, startDate:startDate, dueDate:dueDate, taskContent:taskContent};
  return new Promise((resolve, reject) => {
    task.findOneAndUpdate(
        { id: id },
        { $set: updateTask },
        { returnNewDocument: true }
    ).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
}

module.exports.deleteTask = (root, {id}) => {
  let taskId = id
  return new Promise((resolve, reject) => {
    task.remove(
        { id: id }
    ).exec((err, res) => {
      err ?  reject(err) : resolve({id : taskId});
    });
  });
}
