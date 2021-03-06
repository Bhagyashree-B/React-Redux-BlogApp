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
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    userId: {
      type: new GraphQLNonNull(GraphQLString)
    },
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    status: {
      type: GraphQLString
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
