import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar JSON
  type Query {
    currencyList: [Currency]!
    exchangeRate(base: String!): ExchangeRate!
  }
  type Currency {
    _id: ID!
    name: String
    code: String
  }

  type ExchangeRate {
    base: String
    date: String
    rates: JSON
  }
`

export default typeDefs;