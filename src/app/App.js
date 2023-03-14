import React from "react";
import NavBar from "./components/navBar";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./layots/login";
import Main from "./layots/main";
import UsersLayout from "./layots/usersLayout";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/main" component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={UsersLayout} />{/* получаем url в path и направляем на компонент  */}
                <Redirect to='/' />
            </Switch>
        </>
    );
};

export default App;
