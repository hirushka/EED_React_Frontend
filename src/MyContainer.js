import React, { Component } from "react";
import UserSignin from "./Components/UserSignin";
import UserSignup from "./Components/UserSignup";
import ComponentHolder from "./Components/ComponentHolder";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

class MyContainer extends Component {

    render() {
        return (

            <div>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/signin" />
                        </Route>
                        <Route path="/signup">
                            <UserSignup />
                        </Route>
                        <Route path="/signin">
                            <UserSignin />
                        </Route>
                        <Route path="/home">
                            <ComponentHolder />
                        </Route>
                    </Switch>
                </Router>

            </div>
        )
    }
}
export default MyContainer;