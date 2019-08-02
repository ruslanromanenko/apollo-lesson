import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { getQueryCommentsPost } from "../../graphql/quearies";
import { getUserId } from "../../services/sessionStorage";
import RenderProperties from "../RenderProperties/RenderProperties";

const CommentsPost = ({ postId }) => (
  <Query query={getQueryCommentsPost(postId)} fetchPolicy="cache-and-network">
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return (
        <ul>
          {data.allComments.map(({ id, text, user }) => (
            <li key={id}>
              {user ? `${user.name}` : "incognito"}, {text ? text : "***"}
              &nbsp;
              <RenderProperties isSignIn={false}>
                <Link to={`/user-data/${getUserId()}/update-comment/${id}`}>
                  Edit
                </Link>
              </RenderProperties>
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);

export default CommentsPost;
