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
export const UPDATE_POST_MUTATION = gql`
  mutation updatePost($id: ID!, $text: String, $title: String) {
    updatePost(id: $id, text: $text, title: $title) {
      id
      text
      title
      user {
        id
      }
    }
  }
`;

export const UPDATE_COMMENT_MUTATION = gql`
  mutation updateComment($id: ID!, $text: String) {
    updateComment(id: $id, text: $text) {
      id
      text
      user {
        id
      }
    }
  }
`;
export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(id: $id) {
      id
      text
      user {
        id
      }
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
export const DELETE_POST_MUTATION = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
      user {
        id
        name
      }
    }
  }
`;
export const SIGNIN_USER_MUTATION = gql`
  mutation signinUser($email: AUTH_PROVIDER_EMAIL) {
    signinUser(email: $email) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation createPost($text: String!, $title: String!, $userId: ID!) {
    createPost(text: $text, title: $title, userId: $userId) {
      id
    }
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($text: String!, $postId: ID, $userId: ID) {
    createComment(text: $text, postId: $postId, userId: $userId) {
      id
    }
  }
`;
