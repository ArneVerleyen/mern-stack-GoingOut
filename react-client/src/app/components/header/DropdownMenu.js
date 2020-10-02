import React,{useState} from 'react';

import * as Routes from '../../routes';
import { Link, NavLink, useHistory } from 'react-router-dom';

import { useAuth } from '../../services';
import './DropdownMenu.scss';

import Hamburger from '../../_static/images/bars-solid-white.svg'

const DropdownMenu = (props) => {
	const [open, setOpen] = useState(false);
	const toggle = () => setOpen(!open);

	const { currentUser, logout} = useAuth();
  let history = useHistory();

  const handleLogout = async () => {
    const success = await logout();
    history.push(Routes.AUTH_SIGN_IN);
  }
	
	return (
		<div className='dropdown-container'>
			<button className='nav-toggle' onClick={() => toggle(!open)}><img src={Hamburger}></img></button>
				{open && (	
					<div className="dropped-container">		
						<Link className="nav-item-dropdown" to={Routes.LANDING}>Home</Link>
						<Link className="nav-item-dropdown" to={Routes.EVENT_PAGE}>Events</Link>
						<Link className="nav-item-dropdown" to={Routes.ONLINE_EVENT_PAGE} >Online events</Link>
						<Link className="nav-item-dropdown" to={Routes.AGENDA_PAGE} >Agenda</Link>
						<Link className="nav-item-dropdown" to={Routes.VENUE_PAGE} >Locaties</Link>
						<Link className="nav-item-dropdown" to={Routes.AUTH_SIGN_IN} >Organiseren</Link>
						<Link className="nav-item-dropdown" to={Routes.CONTACT} >Contact</Link>
						{!!currentUser
           ? (
						 <div>
            	<NavLink className="nav-item-dropdown" activeClassName="active" to={Routes.BACKOFFICE_LANDING}>Dashboard</NavLink>
							<button class="nav-item-dropdown button" type="button" onClick={handleLogout}>Logout</button>
         		</div>
           ) 
           : (
            <NavLink className="nav-item-dropdown" activeClassName="active" to={Routes.AUTH_SIGN_IN}>Sign In</NavLink>
           )
          }
					</div>		
				)}

		</div>
	);
};

export default DropdownMenu;