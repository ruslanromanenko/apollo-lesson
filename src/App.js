import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import Layout from "./components/Layout/Layout";
import AllUsers from "./components/AllUsers";
import TopPosts from "./components/TopPosts";
import Post from "./components/Post/Post";
import UserPosts from "./components/UserPosts";
import CreateUser from "./components/CreateUser/CreateUser";
import UserData from "./components/UpdateUserData/UpdateUserData";
import SigninUser from "./containers/SigninUser/SigninUser";
import SignOut from "./components/SignOut";
import Alert from "./components/Alert";
import UserInfo from "./components/UserInfo/UserInfo";
import AllPosts from "./components/AllPosts/AllPosts";
import NotFound from "./components/NotFound";
import UpdatePost from "./components/UpdatePost/UpdatePost";
import CreatePost from "./components/CreatePost/CreatePost";

const client = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/ciyz901en4j590185wkmexyex"
});

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={AllUsers} />
          <Route exact path="/top-posts" component={TopPosts} />
          <Route exact path="/all-posts" component={AllPosts} />
          <Route exact path="/create-user" component={CreateUser} />
          <Route exact path="/post/:postId" component={Post} />
          <Route exact path="/update-post/:postId" component={UpdatePost} />
          <Route exact path="/user/:userId" component={UserInfo} />
          <Route exact path="/update-user/:userId" component={UserData} />
          <Route exact path="/user/:userId/new-post" component={CreatePost} />
          <Route exact path="/sign-in" component={SigninUser} />
          <Route exact path="/sign-out" component={SignOut} />
          <Route exact path="/alert" component={Alert} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
