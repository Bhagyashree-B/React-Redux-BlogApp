import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLType
 } from 'graphql'

// Define our task chart type, with two string fields; `id` and `name`
export default new GraphQLObjectType({
  name: 'TaskChart',
  description: 'Task chart object',
  fields: () => ({
    _id: {
      type: GraphQLID
    },
    total:{
      type: GraphQLInt
    },
    data:{
      type: new GraphQLList( new GraphQLObjectType({
        name: 'chartData',
        description: 'Chart chart object',
        fields: () => ({
            category: {
                type: GraphQLString
            },
            count: {
                type: GraphQLInt
            },
        })
      })
    )}
  })
});