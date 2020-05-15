import React, { useContext, Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { CookieContext } from "../contexts/SessionContext";


export const ProtectedRoute = ({
    roberto: Batman, // Capitalizing because React requires components names to be capitalized
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
                    <Batman {...restOfPropsFromParent} />
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