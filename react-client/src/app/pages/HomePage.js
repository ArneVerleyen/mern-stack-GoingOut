import { default as React, useState, useEffect, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';
import * as Routes from '../routes';
import {
	EventListPaged, 
	VenueList,
} from '../components';

import './homePage.scss';

import buttonAgenda from '../_static/images/btn/btn-home-agenda.svg';
import buttonAccount from '../_static/images/btn/btn-account.svg';
import iconPhone from '../_static/images/icon/icon-phone.svg';
import iconTicket from '../_static/images/icon/icon-ticket.svg';
import Header from '../_static/images/Header.jpg';



const HomePage = ({children}) => {
	const history = useHistory();
	const handleEventReadMore = (eventId) => {
		history.push(`${Routes.EVENT_DETAIL.replace(':id',eventId)}`);
	};

	return (
		<div className="home-page">
			<div className="header-container">
				<img src={Header} alt="header"></img>
				<a href="#body-content"><i class="home-pijl fas fa-arrow-down"></i></a>
			</div>
			<div id="body-content">
				<Link className="page-title" to={Routes.EVENT_PAGE}>Events</Link>
				<EventListPaged paged={{limit: 8, skip:1}} onReadMore={handleEventReadMore} ></EventListPaged>
				<Link className="page-title" to={Routes.VENUE_PAGE}>Locaties</Link>
				<VenueList paged={{limit: 8, skip:1}}></VenueList>
				<Link className='agenda-link'><img className="btn-agenda" src={buttonAgenda} alt="Agenda"></img></Link>

				<Link className="page-title">Organiseren</Link>
				<div className='icon-text-container'>
					<img src={iconPhone} alt='phone' className='icon-phone'></img>
					<p className='text-icon'>Makkelijk onlie tickets bestellen.</p>
				</div>
				<div className='icon-text-container'>
					<p className='text-icon'>Goeie ticketservice.</p>
					<img src={iconTicket} className='icon-ticket' alt='ticket'></img>
				</div>

				<Link className='account-link'><img className="btn-account" src={buttonAccount} alt="Agenda"></img></Link>

			</div>
		</div>
	);
};

export default HomePage;