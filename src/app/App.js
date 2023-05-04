import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Users from "./layouts/users";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvder } from "./hooks/useQualities";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <ProfessionProvider>
          <QualityProvder>
            <Route path="/users/:userId?/:edit?" component={Users} />
          </QualityProvder>

          {/* в пути ? значит необязательный параметр */}
          <Route path="/login/:type?" component={Login} />
          <Route path="/" exact component={Main} />
          <Redirect to="/" />
        </ProfessionProvider>

      </Switch>
      <ToastContainer />
    </div>
  );
}

export default App;
