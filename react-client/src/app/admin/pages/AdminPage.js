import { default as React } from 'react';
import { Route as Router, Redirect } from 'react-router-dom';
import * as Routes from '../../routes';
import DashboardPage from './DashboardPage';
import EventsPage from './EventsPage';
import EventEditPage from './EventEditPage';
import EventCreatePage from './EventCreatePage';
import VenuesPage from './VenuesPage';
import VenueEditPage from './VenueEditPage';
import VenueCreatePage from './VenueCreatePage';
import UserCreatePage from './UserCreatePage';
import UserEditPage from './UserEditPage';
import UsersPage from './UsersPage';


const AdminPage = ({children}) => {
	return(
		<div>
			<Router exact path={Routes.BACKOFFICE_LANDING}>
				<Redirect to={Routes.BACKOFFICE_DASHBOARD}/>
			</Router>
			<Router exact path={Routes.BACKOFFICE_EVENTS} component={EventsPage}></Router>
			<Router exact path={Routes.BACKOFFICE_EVENTS_EDIT} component={EventEditPage}></Router>
			<Router exact path={Routes.BACKOFFICE_EVENTS_CREATE} component={EventCreatePage}></Router>

			<Router exact path={Routes.BACKOFFICE_VENUES} component={VenuesPage}></Router>
			<Router exact path={Routes.BACKOFFICE_VENUES_EDIT} component={VenueEditPage}></Router>
			<Router exact path={Routes.BACKOFFICE_VENUES_CREATE} component={VenueCreatePage}></Router>

			<Router exact path={Routes.BACKOFFICE_USERS} component={UsersPage}></Router>
			<Router exact path={Routes.BACKOFFICE_USERS_EDIT} component={UserEditPage}></Router>
			<Router exact path={Routes.BACKOFFICE_USERS_CREATE} component={UserCreatePage}></Router>


			<Router exact path={Routes.BACKOFFICE_DASHBOARD} component={DashboardPage}></Router>

		</div>
	);
}

export default AdminPage;