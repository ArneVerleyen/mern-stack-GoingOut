import {default as React, useState} from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';



import './Navigation.scss'
import * as Routes from '../../routes';

import Logo from '../../_static/images/LOGO.svg';

import { useAuth } from '../../services';

const Navigation = ({children, state}) => {

	const { currentUser, logout } = useAuth();
	let history = useHistory();

	const handleLogout = async () =>{
		const succes = await logout();
		history.push(Routes.AUTH_SIGN_IN);
	}


	return(
		<nav className="nav-container">
			<Link to={Routes.LANDING}>
				<img className="nav-logo" src={Logo} alt="Going Out?"></img>
			</Link>
			<div className="nav-item-container">
				<Link className="nav-item hidden" to={Routes.LANDING}>Home</Link>
				<Link className="nav-item hidden" to={Routes.EVENT_PAGE}>Events</Link>
				<Link className="nav-item hidden" to={Routes.ONLINE_EVENT_PAGE} >Online Events</Link>
				<Link className="nav-item hidden" to={Routes.AGENDA_PAGE} >Agenda</Link>
				<Link className="nav-item hidden" to={Routes.VENUE_PAGE} >Locaties</Link>
				<Link className="nav-item hidden" to={Routes.AUTH_SIGN_IN} >Organiseren</Link>
				<Link className="nav-item hidden" to={Routes.CONTACT} >Contact</Link>
				<Link className="nav-item hidden" to={Routes.AUTH_SIGN_IN} >Login</Link>
				{!!currentUser
           ? (
    
						<div>
              <NavLink className="nav-item hidden" activeClassName="active" to={Routes.BACKOFFICE_LANDING}>Dashboard</NavLink>
              <button class="nav-item hidden button" type="button" onClick={handleLogout}>Logout</button>
						</div>
           ) 
           : (
            <NavLink className="nav-item hidden" activeClassName="active" to={Routes.AUTH_SIGN_IN}>Sign In</NavLink>
           )
          }
			</div>
		</nav>
	);
};

export default Navigation;