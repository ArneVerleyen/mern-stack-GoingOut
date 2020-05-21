import { default as React, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import * as Routes from '../routes';

import { EventList } from '../components';

const EventPage = ({children}) => {
	const history = useHistory();
	const handleEventReadMore = (eventId) => {
		history.push(`${Routes.EVENT_DETAIL.replace(':id',eventId)}`);
	};

	return (
	<div className="event-list">
		<EventList onReadMore={handleEventReadMore} />
	</div>
	);
};

export default EventPage;