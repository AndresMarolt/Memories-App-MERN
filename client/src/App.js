import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { GoogleOAuthProvider} from '@react-oauth/google'
import { Container } from "@material-ui/core";
import dotenv from 'dotenv'

import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
dotenv.config();

const App = () => {

    return(
        <GoogleOAuthProvider clientId={`${process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}`}>
            <BrowserRouter>
                <Container maxWidth="lg">
                    <NavBar />
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/auth" exact component={Auth}/>
                    </Switch>

                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App;