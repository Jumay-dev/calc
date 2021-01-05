import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Page404 from './pages/Page404'

import MainPage from './pages/MainPage'
import CalculatorPage from './pages/CalculatorPage'
import AboutPage from './pages/AboutPage'

import "./css/main.css"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/calculator" component={CalculatorPage}/>
        <Route exact path="/about" component={AboutPage}/>

        <Route component={Page404}/>
      </Switch>
    </Router>
  );
}

export default App;
