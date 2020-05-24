import {default as React, useState} from 'react';
import { Link, NavLink } from 'react-router-dom';



import './Navigation.scss'
import * as Routes from '../../routes';

import Logo from '../../_static/images/LOGO.svg';

const Navigation = ({children, state}) => {


	return(
		<nav className="nav-container">
			<Link to={Routes.LANDING}>
				<img className="nav-logo" src={Logo} alt="Going Out?"></img>
			</Link>
			<div className="nav-item-container">
				<Link className="nav-item hidden" to={Routes.LANDING}>Home</Link>
				<Link className="nav-item hidden" to={Routes.EVENT_PAGE}>Events</Link>
				<Link className="nav-item hidden" to={Routes.ONLINE_EVENT_PAGE} >Online Events</Link>
				<Link className="nav-item hidden" >Agenda</Link>
				<Link className="nav-item hidden" to={Routes.VENUE_PAGE} >Locaties</Link>
				<Link className="nav-item hidden" >Organiseren</Link>
				<Link className="nav-item hidden" to={Routes.CONTACT} >Contact</Link>
				<Link className="nav-item hidden" >Login</Link>
			</div>
		</nav>
	);
};

export default Navigation;