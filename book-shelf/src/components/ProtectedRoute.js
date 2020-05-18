import React, { useContext, Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { CookieContext } from "../contexts/SessionContext";

// renders a ProtectedRoute component and its props

export const ProtectedRoute = ({
    component: Component, // Capitalizing because React requires components names to be capitalized
    ...restOfPropsFromParent
}) => {

    console.log(restOfPropsFromParent);

    const [uuid] = useContext(CookieContext);

    // 
    return (
        <Route
            {...restOfPropsFromParent}
            render={propsFromRouter => {
                return uuid ? (
                    <Component {...restOfPropsFromParent} />
                ) :
                    (
                        <Redirect
                            to="/"
                            {...propsFromRouter}
                            {...restOfPropsFromParent}
                        />
                    );
            }}
        />
    );
};