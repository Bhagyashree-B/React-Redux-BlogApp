import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
  } from 'graphql';

import taskType from './taskType';
import task from './taskSchema';

export default {
  addTask:{
    type:taskType,
    args: {
      userId:{
        name:'userId',
        type:new GraphQLNonNull(GraphQLString)
      },
      title:{
        name:'title',
        type:new GraphQLNonNull(GraphQLString)
      },
      status:{
        name:'status',
        type: GraphQLString
      },
      category:{
        name:'category',
        type: GraphQLString
      },
      startDate:{
        name:'startDate',
        type: GraphQLString
      },
      dueDate:{
        name:'dueDate',
        type: GraphQLString
      },
      taskContent:{
        name:'taskContent',
        type: GraphQLString
      }
    },
    resolve: task.addTask
  },
  updateTask:{
    type:taskType,
    args: {
      id:{
        type: GraphQLID
      },
      title:{
        name:'title',
        type:new GraphQLNonNull(GraphQLString)
      },
      status:{
        name:'status',
        type: GraphQLString
      },
      category:{
        name:'category',
        type: GraphQLString
      },
      startDate:{
        name:'startDate',
        type: GraphQLString
      },
      dueDate:{
        name:'dueDate',
        type: GraphQLString
      },
      taskContent:{
        name:'taskContent',
        type: GraphQLString
      }
    },
    resolve: task.updateTask
  },
  deleteTask:{
    type:taskType,
    args: {
      id:{
        type: GraphQLID
      }
    },
    resolve: task.deleteTask
  }
};
