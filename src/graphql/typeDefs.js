const { gql } = require('apollo-server-express');

const typeDefs = gql`
  input CREATE_NEW_ADMIN_DATA {
    email: String
    password: String
  }

  input CREATE_NEW_PRODUCT_DATA {
    productName: String
  }

  input LOGIN_DATA {
    email: String
    password: String
  }

  type ADMIN {
    email: String
    _id: ID!
  }

  type AUTH_TOKEN {
    authToken: String!
  }

  type PRODUCT_DATA {
    productName: String
  }

  type Mutation {
    createNewAdmin(createNewAdminData: CREATE_NEW_ADMIN_DATA): ADMIN!
    createNewProduct(createNewProductData: CREATE_NEW_PRODUCT_DATA): PRODUCT_DATA!
  }

  type Query {
    isAuth: Boolean!
    login(loginData: LOGIN_DATA): AUTH_TOKEN!
  }
`;

module.exports = { typeDefs };
