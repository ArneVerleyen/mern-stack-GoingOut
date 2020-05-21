import { default as React, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import * as Routes from '../routes';

import '../app.scss'

import { EventListPaged } from '../components';

const EventPagePaged = ({children}) => {
	const history = useHistory();
	const handleEventReadMore = (eventId) => {
		history.push(`${Routes.EVENT_DETAIL.replace(':id',eventId)}`);
	};

	return (
	<div className="event-list">
		<h3 className="page-title">Events</h3>
		<EventListPaged paged={{limit: 12, skip:1}} onReadMore={handleEventReadMore} />
	</div>
	);
};

export default EventPagePaged;