const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { ApolloServer, gql } = require('apollo-server-express');
const Recipe = require('./models/Recipe');

// MongoDB connection
mongoose.connect('mongodb://mongo:27017/recipe_db', { useNewUrlParser: true, useUnifiedTopology: true });

// Define GraphQL schema
const typeDefs = gql`
  type Recipe {
    id: ID!
    title: String!
    description: String!
    ingredients: [String!]!
    steps: [String!]!
    category: String!
    publishedDate: String!
  }

  type Query {
    getRecipes: [Recipe!]!
  }
`;

const resolvers = {
  Query: {
    getRecipes: async () => {
      return await Recipe.find();
    }
  }
};

// Set up ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    try {
      const decoded = jwt.verify(token, 'your_jwt_secret_key');
      return { user: decoded };
    } catch (err) {
      return { user: null };
    }
  }
});

// Set up Express
const app = express();
server.applyMiddleware({ app });

app.listen(4001, () => {
  console.log('Server running on http://localhost:4001/graphql');
});
