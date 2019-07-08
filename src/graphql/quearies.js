import gql from "graphql-tag";

export const QUERY_USERS = gql`
  query {
    allUsers {
      id
      name
    }
  }
`;
