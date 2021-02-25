import React, {Suspense, lazy} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.scss';

const HomePage = lazy(()=> import('./pages/HomePage'));
const TwoPlayers = lazy(()=> import('./pages/TwoPlayers'));
const GamePage = lazy(() => import('./pages/GamePage'));

function App() {
  return (
    <div className="app-container">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route
                exact
                path="/"
                render={(props) => <HomePage {...props} />}
            />
            <Route
                exact
                path="/twoPlayers"
                render={(props) => <TwoPlayers {...props} />}
            />
            <Route
                exact
                path="/gamePage"
                render={(props) => <GamePage {...props} />}
            />
        </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
