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

var dataBycategoryType = new GraphQLObjectType({
  name: 'dataBycategory',
  fields: {
    _id: { type: GraphQLID },
    total:{ type: GraphQLInt },
    data:{
        type: new GraphQLList( new GraphQLObjectType({
        name: 'chartData',
        description: 'Chart chart object',
        fields: () => ({
            category: { type: GraphQLString },
            count: { type: GraphQLInt },
        })
      })
    )}
  }
});

var allDatatype = new GraphQLObjectType({
  name: 'allData',
  fields: {
    _id: { type: GraphQLID },
    userId: { type: GraphQLString },
    count: { type: GraphQLInt },
    userName: { type: GraphQLString },
  }
});

// Define our task chart type, with two string fields; `id` and `name`
export default new GraphQLObjectType({
  name: 'TaskChart',
  description: 'Task chart object',
  fields: () => ({
    dataBycategory: {
      type: dataBycategoryType
    },
    allData : {
      type : new GraphQLList( allDatatype )
    }
  })
});