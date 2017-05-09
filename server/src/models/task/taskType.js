import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
 } from 'graphql'

// Define our task type, with two string fields; `id` and `name`
export default new GraphQLObjectType({
  name: 'Task',
  description: 'Task object',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    id: {
      type: GraphQLString
    },
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    category: {
      type: GraphQLString
    },
    startDate: {
      type: GraphQLString
    },
    dueDate: {
      type: GraphQLString
    },
    taskContent:{
      type: GraphQLString
    },
    count:{
      type: GraphQLString
    }
  })
});
