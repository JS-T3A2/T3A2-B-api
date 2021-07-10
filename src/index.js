const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const express = require('express');

const { createDatabaseConnection } = require('./database/createDatabaseConnection');
const { CustomError } = require('./errors/CustomErrors');
const resolvers = require('./graphql/resolvers');
const { typeDefs } = require('./graphql/typeDefs');
const { authenticateUser } = require('./utils/authenticateUser');

const PORT = process.env.PORT || 5000;

const initializeExpress = async () => {
  const app = express();

  const server = new ApolloServer({
    context: ({ req }) => {
      const user = authenticateUser(req);

      return { req, user };
    },
    formatError: (error) => {
      console.log(error);
      // TODO: Better error handler.
      if (error.originalError) {
        if (error.originalError instanceof CustomError) {
          return {
            code: error.originalError.code,
            data: error.originalError.data,
            message: error.originalError.message,
          };
        } else {
          return {
            code: 'INTERNAL_ERROR',
            status: '500',
            message: 'Something went wrong! Please try again later.',
          };
        }
      } else {
        return {
          code: 'INTERNAL_ERROR',
          status: '500',
          message: 'Something went wrong! Please try again later.',
        };
      }
    },
    introspection: Boolean(process.env.NODE_ENV === 'dev'),
    playground: Boolean(process.env.NODE_ENV === 'dev'),
    resolvers,
    typeDefs,
  });

  await server.start();

  server.applyMiddleware({ app, path: '/v1/graphql' });

  app.use(express.json());
  app.use(cors());

  await new Promise((resolve) => app.listen({ port: PORT }, resolve));
  console.log(`Express listening on port ${PORT}...`);
  console.log(`Graphql listening on port ${PORT}${server.graphqlPath}...`);
};

const establishDatabaseConnection = async () => {
  await createDatabaseConnection();
};

const initializeApp = async () => {
  try {
    await establishDatabaseConnection();
    initializeExpress();
  } catch (error) {
    console.log(error.message);
    console.log('Could not establish database connection.\nShutting down!');
  }
};

initializeApp();
