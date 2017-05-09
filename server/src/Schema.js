import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList
} from 'graphql';

var mongoose = require('mongoose')  
var TASKS = mongoose.model('tasks', {
  id: mongoose.Schema.Types.ObjectId,
  title: String,
  taskContent: String
})

var TaskType = new GraphQLObjectType({  
  name: 'task',
  fields: function () {
    return {
      id: {
        type: GraphQLID
      },
      title: {
        type: GraphQLString
      },
      taskContent: {
        type: GraphQLString
      }
    }
  }
});

var QueryType = new GraphQLObjectType({  
  name: 'Query',
  fields: function () {
    return {
      tasks: {
        type: new GraphQLList(TaskType),
        resolve: () => {
                return new Promise((resolve, reject) => {
                TASKS.find((err, tasks) => {
                    if (err) reject(err)
                    else resolve(tasks)
                })
            })
        }
      }
    }
  }
});

var MutationAdd = {  
  type: TaskType,
  description: 'Add a Task',
  args: {
    title: {
      name: 'Task title',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root, args) => {
    var newTask = new TODO({
      title: args.title,
      completed: false
    })
    newTask.id = newTask._id
    return new Promise((resolve, reject) => {
      newTask.save(function (err) {
        if (err) reject(err)
        else resolve(newTask)
      })
    })
  }
}

var MutationType = new GraphQLObjectType({  
  name: 'Mutation',
  fields: {
    add: MutationAdd
  }
});
export var Schema = new GraphQLSchema({  
  query: QueryType,
  mutation: MutationType
});
