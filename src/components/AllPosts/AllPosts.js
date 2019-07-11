import React from "react";
import { Link } from "react-router-dom";
import { Mutation, Query } from "react-apollo";
import { QUERY_ALL_POSTS, QUERY_USERS } from "../../graphql/quearies";
import { DELETE_USER_MUTATION } from "../../graphql/mutations";

const AllPosts = () => (
  <Query query={QUERY_ALL_POSTS} fetchPolicy="network-only">
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return (
        <ul key="topPosts">
          {data.allPosts.map(({ id, title, user }) => (
            <li key={id}>
              <Link to={`/post/${id}`}>
                {user ? user.name : "incognito"}, {title ? title : "***"}
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
              </Link>
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);

export default AllPosts;
