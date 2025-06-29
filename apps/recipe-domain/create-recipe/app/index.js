const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { ApolloServer, gql } = require('apollo-server-express');
const { verifyToken } = require('./utils/verifyToken');
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

  input RecipeInput {
    title: String!
    description: String!
    ingredients: [String!]!
    steps: [String!]!
    category: String!
  }

  type Query {
    getRecipes: [Recipe!]!
  }

  type Mutation {
    createRecipe(input: RecipeInput!): Recipe!
  }
`;

const resolvers = {
  Query: {
    getRecipes: async () => {
      return await Recipe.find();
    }
  },
  Mutation: {
    createRecipe: async (_, { input }, { user }) => {
      if (!user) throw new Error("Unauthorized");

      const recipe = new Recipe({
        ...input,
        publishedDate: new Date().toISOString(),
      });
      await recipe.save();
      return recipe;
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

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000/graphql');
});
