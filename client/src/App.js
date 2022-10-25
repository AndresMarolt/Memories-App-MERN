import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { GoogleOAuthProvider} from '@react-oauth/google'
import { Container } from "@material-ui/core";
import dotenv from 'dotenv'

import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails"

dotenv.config();

const App = () => {

    const user = JSON.parse(localStorage.getItem('profile'));
    console.log(user);

    return(
        <GoogleOAuthProvider clientId={`${process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}`}>
            <BrowserRouter>
                <Container maxWidth="xl">
                    <NavBar />
                    <Switch>
                        <Route path="/" exact component={() => <Redirect to="/posts" />}/>
                        <Route path="/posts" exact component={Home} />
                        <Route path="/posts/search" exact component={Home} />
                        <Route path="/posts/:id" component={PostDetails} />
                        <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
                    </Switch>

                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App;