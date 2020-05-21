import React,{useState} from 'react';

import * as Routes from '../../routes';
import { Link, NavLink } from 'react-router-dom';

import './DropdownMenu.scss';

import Hamburger from '../../_static/images/bars-solid-white.svg'

const DropdownMenu = (props) => {
	const [open, setOpen] = useState(false);
	const toggle = () => setOpen(!open);
	
	return (
		<div className='dropdown-container'>
			<button className='nav-toggle' onClick={() => toggle(!open)}><img src={Hamburger}></img></button>
				{open && (	
					<div className="dropped-container">		
						<Link className="nav-item-dropdown" to={Routes.LANDING}>Home</Link>
						<Link className="nav-item-dropdown" to={Routes.EVENT_PAGE}>Events</Link>
						<Link className="nav-item-dropdown" >In de buurt</Link>
						<Link className="nav-item-dropdown" >Agenda</Link>
						<Link className="nav-item-dropdown" to={Routes.VENUE_PAGE} >Locaties</Link>
						<Link className="nav-item-dropdown" >Organiseren</Link>
						<Link className="nav-item-dropdown" to={Routes.CONTACT} >Contact</Link>
						<Link className="nav-item-dropdown" >Login</Link>
					</div>		
				)}

		</div>
	);
};

export default DropdownMenu;