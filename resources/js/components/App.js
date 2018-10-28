/**
 *
 * 	App Strting Point
 *
 * 	@author Pascal Brunner <info@pascalbrunner.ch>
 *  @copyright Pascal Brunner 2018-10-28
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';

import Home from './Home';

function App() {
  	return (
    	<Home />
  	);
}

ReactDOM.render(
  	<App />,
  	document.getElementById('app')
);
