import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { WodProvider } from './providers/WodProvider';
import Home from './screens/Home/Home';
import Scores from './screens/Home/Scores';
import './App.css';

const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <WodProvider>
        <Layout>
          <Switch>
            <Route path="/scores/">
              <Scores />
            </Route>
            <Route path="/profile/">
              <>
                <h3>TBD</h3>
              </>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Layout>
      </WodProvider>
    </Router>
  );
};

export default App;
