import { makeExecutableSchema } from 'apollo-server';
import { augmentSchema } from 'neo4j-graphql-js';
import gql from 'graphql-tag';

import { authenticate } from '../services'

const typeDefs= gql`
    type Query {

    }  

    type Mutation {
        SignIn(username: String!, password: String!): String
    }
`;

const resolvers = () => {
    SignIn: async ({}, {username, password}) => {
        console.log(username, password);
        return await authenticate({}, {username, password});
    },
}

export const schema = makeExecutableSchema({ typeDefs, resolvers });

export const augmentedSchema = augmentSchema(schema);
