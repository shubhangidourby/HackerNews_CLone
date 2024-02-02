import React, { useState } from "react";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import News from "./components/News";
import "./App.css";
import SignUp from "./components/SignUp";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

const App = () => {
  const [isLoading, setLoadingState] = useState(true);

  const showLoader = () => {
    setLoadingState(true);
  };
  const hideLoader = () => {
    setLoadingState(false);
  };

  return (
    <Router>
       <Switch>
        <Route path="/" exact component={SignUp} />
      </Switch>  
      <Header showLoader={showLoader} />
      
      <Switch>
        <>
          <Route
            exact
            key="dashboard"
            path="/top"
            render={() => (
              <News
                isLoading={isLoading}
                hideLoader={hideLoader}
                showLoader={showLoader}
              />
            )}
          />
          
          
        </>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;