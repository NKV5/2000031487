import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TrainsList from './components/TrainsList';
import SingleTrain from './components/SingleTrain';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <TrainsList />
        </Route>
        <Route path="/train/:trainId">
          <SingleTrain />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
