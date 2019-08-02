import React from "react";
import { Link } from "react-router-dom";
import { Mutation, Query } from "react-apollo";
import { QUERY_ALL_POSTS } from "../../graphql/quearies";
import { DELETE_POST_MUTATION } from "../../graphql/mutations";
import RenderProperties from "../RenderProperties/RenderProperties";

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
                {user ? `${user.name}` : "incognito"}, {title ? title : "***"}
              </Link>
              &nbsp;
              <RenderProperties isSignIn={false}>
                <Mutation
                  mutation={DELETE_POST_MUTATION}
                  update={(cache, { data: { deletePost } }) => {
                    const { allPosts } = cache.readQuery({
                      query: QUERY_ALL_POSTS
                    });
                    cache.writeQuery({
                      query: QUERY_ALL_POSTS,
                      data: {
                        allPosts: allPosts.filter(
                          post => post.id !== deletePost.id
                        )
                      }
                    });
                  }}
                >
                  {(deletePost, { loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;
                    return (
                      <button
                        onClick={evt => {
                          evt.preventDefault();
                          deletePost({
                            variables: {
                              id: id
                            }
                          });
                        }}
                      >
                        delete
                      </button>
                    );
                  }}
                </Mutation>
                &nbsp;
                <Link to={`/update-post/${id}`}>Edit</Link>
              </RenderProperties>
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);

export default AllPosts;
