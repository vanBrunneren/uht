/**
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";

import Teams from './Teams';

import CategoryList from './Categories/CategoryList';
import CategoryCreate from './Categories/CategoryCreate';

const App = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/teams">Teams</Link>
        </li>
        <li>
          <Link to="/category/list">Kategorien anzeigen</Link>
        </li>
      </ul>

      <hr />

      <Route path="/teams" component={Teams} />
      <Route path="/category/list" component={CategoryList} />
      <Route path="/category/create" component={CategoryCreate} />

    </div>
  </Router>
);
export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
