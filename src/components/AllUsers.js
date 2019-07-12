import React from "react";
import { Link } from "react-router-dom";
import { Mutation, Query } from "react-apollo";
import { DELETE_USER_MUTATION } from "../graphql/mutations";
import { QUERY_USERS } from "../graphql/quearies";
import RenderProperties from "./RenderProperties/RenderProperties";

class AllUsers extends React.Component {
  render() {
    return (
      <Query query={QUERY_USERS} fetchPolicy="network-only">
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          return (
            <RenderProperties>
              <ul key="allUsers">
                {data.allUsers.map(({ id, name }) => (
                  <li key={id}>
                    <Link to={`/user/${id}`}>{name ? name : "incognoito"}</Link>
                    <div>
                      &nbsp;
                      <Link to={`/update-user/${id}`}>edit</Link>
                      &nbsp;
                      <Mutation
                        mutation={DELETE_USER_MUTATION}
                        update={(cache, { data: { deleteUser } }) => {
                          const { allUsers } = cache.readQuery({
                            query: QUERY_USERS
                          });

                          cache.writeQuery({
                            query: QUERY_USERS,
                            data: {
                              allUsers: allUsers.filter(
                                user => user.id !== deleteUser.id
                              )
                            }
                          });
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
                    </div>
                  </li>
                ))}
              </ul>
            </RenderProperties>
          );
        }}
      </Query>
    );
  }
}

export default AllUsers;
