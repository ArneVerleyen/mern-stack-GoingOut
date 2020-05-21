import { default as React, useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../services';

import { VenueDetail } from '../components';

const VenueDetailPage = ({children}) => {
	const { id } = useParams();
	const { findVenue } = useApi();
	const [ venue, setVenue ] = useState(null);

	useEffect(() =>{
		const fetchVenue = async () => {
			const data = await findVenue(id);
			setVenue(data);
		}
		fetchVenue();

		return () => {

		}
	}, [id]);

	return (
		<Fragment>
			<VenueDetail venue={venue} />
		</Fragment>
	);
};

export default VenueDetailPage;