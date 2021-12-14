const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Student {
        name: String!
        age: Int!
        rating: String!
        male: Boolean!
    }

    type Query {
        getAllStudents: [Student!]!
    }

    type Mutation {
        createStudent(name: String!, age: Int!, rating: String!, male: Boolean!): Student!
    }
`;

module.exports = { typeDefs };