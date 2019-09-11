import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql'

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      Status: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: () => 'Good',
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      Login: {
        type: new GraphQLNonNull(GraphQLString),
        args: {
          email: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (...args: any[]) => {
          console.log(args[1])
          return args[1].email
        },
      },
    },
  }),
})
