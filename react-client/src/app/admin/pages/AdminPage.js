import { default as React } from 'react';
import { Route as Router, Redirect } from 'react-router-dom';
import * as Routes from '../../routes';
import DashboardPage from './DashboardPage';
import EventsPage from './EventsPage';


const AdminPage = ({children}) => {
	return(
		<div>
			<Router exact path={Routes.BACKOFFICE_LANDING}>
				<Redirect to={Routes.BACKOFFICE_DASHBOARD}/>
			</Router>
			<Router exact path={Routes.BACKOFFICE_EVENTS} component={EventsPage}></Router>
			<Router exact path={Routes.BACKOFFICE_DASHBOARD} component={DashboardPage}></Router>

		</div>
	);
}

export default AdminPage;