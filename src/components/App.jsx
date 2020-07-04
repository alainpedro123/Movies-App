import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MoviesApp from '../pages/MoviesApp';
import MovieForm from '../pages/MovieForm';
import NotFound from "../pages/NotFound";

class App extends Component {
  render() {
    return (
      <div>
        <main className="container">
          <Switch>
            <Route exact path="/" component={MoviesApp} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App