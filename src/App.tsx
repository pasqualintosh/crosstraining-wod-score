import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { WodProvider } from './providers/WodProvider';
import Home from './screens/Home';
import Scores from './screens/Scores';
import Profile from './screens/Profile';
import './App.css';
import { UserProvider } from './providers/UserProvider';

const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <UserProvider>
        <WodProvider>
          <Layout>
            <Switch>
              <Route path="/scores/">
                <Scores />
              </Route>
              <Route path="/profile/">
                <Profile />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Layout>
        </WodProvider>
      </UserProvider>
    </Router>
  );
};

export default App;
