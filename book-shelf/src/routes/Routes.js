import React, { useState, useContext } from "react";
import App from "../App";
import Search from "../components/search/Search.js";
import Bookshelf from "../components/bookshelf/Bookshelf.js";
import Details from "../components/details/Details"
import { Route, Switch } from "react-router-dom";
import { CookieProvider } from "../contexts/SessionContext";
import { ProtectedRoute } from "../components/ProtectedRoute.js";
import NavBar from "../components/navbar/NavBar";

export const Routes = () => {

    console.log();
    return (
        <CookieProvider>
            <NavBar />
            <Switch>
                <Route exact path="/" component={App} />
                <ProtectedRoute path="/Search" component={Search} />
                <ProtectedRoute path="/Bookshelf" component={Bookshelf} />
                <ProtectedRoute path="/Details/:id" component={Details} />
            </Switch>
        </CookieProvider>
    );
};