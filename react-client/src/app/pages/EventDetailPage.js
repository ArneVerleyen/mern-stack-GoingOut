import { default as React, useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../services';

import { EventDetail } from '../components';

const EventDetailPage = ({children}) => {
	const { id } = useParams();
	const { findEvent } = useApi();
	const [ event, setEvent ] = useState(null);

	useEffect(() =>{
		const fetchEvent = async () => {
			const data = await findEvent(id);
			setEvent(data);
		}
		fetchEvent();

		return () => {

		}
	}, [id]);

	return (
		<Fragment>
			<EventDetail event={event} />
		</Fragment>
	);
};

export default EventDetailPage;