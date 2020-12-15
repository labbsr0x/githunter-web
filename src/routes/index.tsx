import React from 'react';
import { Switch, Route, useParams } from 'react-router-dom';

import Home from '../pages/Home';
import RepositoryDetails from '../pages/RepositoryDetails';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/:owner/:name" exact component={RepositoryDetails} />
  </Switch>
);

export default Routes;
