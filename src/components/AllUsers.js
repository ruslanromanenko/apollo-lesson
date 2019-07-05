import React from "react";
import { Link } from "react-router-dom";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
const FETCH_USERS = gql`
  query {
    allUsers {
      id
      name
    }
  }
`;

class AllUsers extends React.Component {
  render() {
    return (
      <Query query={FETCH_USERS}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          return (
            <ul key="allUsers">
              {data.allUsers.map(({ id, name }) => (
                <li key={id}>
                  <Link to={`/user/${id}`}>{name ? name : "incognoito"}</Link>{" "}
                  &nbsp;
                  <Link to={`/userData/${id}`}>edit</Link>
                  &nbsp;
                  <Mutation
                    mutation={DELETE_USER}
                    refetchQueries={() => {
                      return [{ query: FETCH_USERS }];
                    }}
                  >
                    {(deleteUser, { loading, error, data }) => {
                      if (loading) return <p>Loading...</p>;
                      if (error) return <p>Error :(</p>;
                      return (
                        <button
                          onClick={evt => {
                            deleteUser({
                              variables: {
                                id: id
                              }
                            });
                          }}
                          id={id}
                        >
                          delete
                        </button>
                      );
                    }}
                  </Mutation>
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}

export default AllUsers;
