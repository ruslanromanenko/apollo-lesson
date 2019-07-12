import React from "react";
import UserInfo from "../UserInfo/UserInfo";
import CommentsUser from "../CommentsUser/CommentsUser";
import classes from "./UserData.module.css";
import PostsUser from "../PostsUser/PostsUser";

const UserData = props => (
  <div className={classes.UserData}>
    <div>
      <h3>User Information</h3>
      <UserInfo userId={props.match.params.userId} />
    </div>
    <div>
      <h3>User Comments</h3>
      <CommentsUser userId={props.match.params.userId} />
    </div>
    <div>
      <h3>User Posts</h3>
      <PostsUser userId={props.match.params.userId} />
    </div>
  </div>
);

export default UserData;
