import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import Layout from "./components/Layout/Layout";
import AllUsers from "./components/AllUsers";
import TopPosts from "./components/TopPosts";
import Post from "./components/Post";
import UserPosts from "./components/UserPosts";
import CreateUser from "./components/CreateUser/CreateUser";
import UserData from "./components/UserData/UserData";

const client = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/ciyz901en4j590185wkmexyex"
});

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={AllUsers} />
          <Route exact path="/posts" component={TopPosts} />
          <Route exact path="/newUser" component={CreateUser} />
          <Route exact path="/post/:postId" component={Post} />
          <Route exact path="/user/:userId" component={UserPosts} />
          <Route exact path="/userData/:userId" component={UserData} />
          {/*<Route exact path='/user/:userId' component={ NewPost } />*/}
        </Switch>
      </Layout>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
