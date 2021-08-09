import React from "react";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import InvinityScroll from "./Pages/InvinityScroll";

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/InvinityScroll">Infinity Scroll</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/"><Home/></Route>
          <Route path="/InvinityScroll" component={InvinityScroll}></Route>
        </Switch>
      </div>
    </Router>
  );
}


function Home() {
  return (
    <div>
      <h2>This is Home</h2>
    </div>
  );
}


