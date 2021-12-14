const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./Schema/TypeDefs") 
const { resolvers } = require("./Schema/Resolvers") 
const express = require('express');
const app = express();


async function startApolloServer(typeDefs, resolvers){
    const server = new ApolloServer({ typeDefs, resolvers});

    await server.start();
    server.applyMiddleware({ app, path: '/graphql'});

    app.listen({port: 8000}, () => {
        console.log("Server running on port 8000");
    });
}

startApolloServer(typeDefs, resolvers);