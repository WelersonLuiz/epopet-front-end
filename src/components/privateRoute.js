import { BrowserRouter,Route,Switch, Redirect } from "react-router-dom"
import React, {useContext} from "react";
import {Context} from "./authContext"

function PrivateRoute({component: Component, ...rest}){
    const {authenticated, loading} = useContext(Context)

    
    if(loading){
        return <h1></h1>
    }
    console.debug('Tentando passar pelo login', authenticated)

    return (
    <Route {...rest} render={props => (
        (authenticated) ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{pathname: "/login", state: {from: props.location}}} />
        )
    )}/>)
        };

export default PrivateRoute;