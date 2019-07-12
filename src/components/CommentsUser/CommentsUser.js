import React from "react";
import { Link } from "react-router-dom";
import { Mutation, Query } from "react-apollo";
import { getQueryCommentsUser } from "../../graphql/quearies";
import { DELETE_COMMENT_MUTATION } from "../../graphql/mutations";
import RenderProperties from "../RenderProperties/RenderProperties";

const CommentsUser = props => (
  <Query query={getQueryCommentsUser(props.userId)} fetchPolicy="network-only">
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return (
        <ul key="topPosts">
          {data.allComments.map(({ id, text, user }) => (
            <li key={id}>
              <Link to={`/update-comment/${id}`}>{text ? text : "***"}</Link>
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);

export default CommentsUser;
