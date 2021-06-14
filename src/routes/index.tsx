import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FilmDedail from '../pages/FilmDetail';
import FilmsListDashboard from '../pages/FilmsListDashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={FilmsListDashboard} />
    <Route path="/film-detail" exact component={FilmDedail} />

  </Switch>
);

export default Routes;
