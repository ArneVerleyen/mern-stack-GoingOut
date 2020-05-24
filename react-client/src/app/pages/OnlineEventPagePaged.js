import { default as React, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import * as Routes from '../routes';

import '../app.scss'

import { OnlineEventListPaged } from '../components';

const OnlineEventPagePaged = ({children}) => {
	const history = useHistory();
	const handleOnlineEventReadMore = (onlineEventId) => {
		history.push(`${Routes.ONLINE_EVENT_DETAIL.replace(':id',onlineEventId)}`);
	};

	return (
	<div className="nlineEvent-list">
		<h3 className="page-title">Online Events</h3>
		<OnlineEventListPaged paged={{limit: 12, skip:1}} onReadMore={handleOnlineEventReadMore} />
	</div>
	);
};

export default OnlineEventPagePaged;