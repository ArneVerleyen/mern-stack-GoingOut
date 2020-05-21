import { default as React, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import * as Routes from '../routes';

import { VenueList } from '../components';

const VenuePage = ({children}) => {
	const history = useHistory();
	const handleVenueReadMore = (venueId) => {
		history.push(`${Routes.VENUE_DETAIL.replace(':id',venueId)}`);
	};

	return (
	<div className="venue-list">
		<VenueList paged={{limit: 12, skip:1}} onReadMore={handleVenueReadMore} />
	</div>
	);
};

export default VenuePage;