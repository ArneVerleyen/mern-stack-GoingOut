import { default as React, useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../services';

import { OnlineEventDetail } from '../components';

const OnlineEventDetailPage = ({children}) => {
	const { id } = useParams();
	const { findOnlineEvent } = useApi();
	const [ onlineEvent, setOnlineEvent ] = useState(null);

	useEffect(() =>{
		const fetchOnlineEvent = async () => {
			const data = await findOnlineEvent(id);
			setOnlineEvent(data);
		}
		fetchOnlineEvent();

		return () => {

		}
	}, [id]);

	return (
		<Fragment>
			<OnlineEventDetail onlineEvent={onlineEvent} />
		</Fragment>
	);
};

export default OnlineEventDetailPage;