import React from 'react';

// Router importeren
import { BrowserRouter as Router, Redirect, Switch  } from 'react-router-dom';

// Eigen bestand imports de pages
import {
	ContactPage,
	HomePage,
	SignInPage,
} from './pages';
// Meer eigen imports 
import { RouteWithLayout } from './utilities';
import { PageLayOut } from './layout';
import * as Routes from './routes';

import { ApiProvider } from './services';

// Css import
import './App.css';

// App
function App() {
  return (
    <div className="App">
			<ApiProvider>
				<Router basename='/'>
					<Switch>
						<RouteWithLayout exact path={Routes.LANDING} component={HomePage} layout={PageLayOut} />
						<Redirect exact path = {Routes.HOME} to = {Routes.LANDING} />
						<RouteWithLayout exact path ={Routes.CONTACT} component={ContactPage} layout={PageLayOut} />
						<RouteWithLayout exact path ={Routes.AUTH_SIGN_IN} component={SignInPage}  />
					</Switch>
				</Router>
			</ApiProvider>
	 </div>
  );
}

export default App;
