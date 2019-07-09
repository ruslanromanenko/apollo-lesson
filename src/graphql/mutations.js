import gql from "graphql-tag";

export const CREATE_USER_MUTATION = gql`
  mutation createUser($name: String!, $authProvider: AuthProviderSignupData!) {
    createUser(name: $name, authProvider: $authProvider) {
      id
      name
      email
    }
  }
`;
export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($id: ID!, $name: String) {
    updateUser(id: $id, name: $name) {
      id
      name
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
