import { default as React, Fragment } from 'react';

import './venueDetail.scss';

const VenueDetail = ({ venue }) => {
	return (
		<Fragment>
			{!!venue
				? <Fragment>
						<div className="row venue-container">
							<article className="venue-detail col-md-12 col-lg-8">
								<h1 className="venue-title">{venue.name}</h1>
								<p className="venue-description">{venue.description}</p>
								<p>{venue.city}</p>
								<p>{venue.street} {venue.houseNumber}</p>
							</article>

							<div className="col-lg-4 col-md-12"><img className="venue-img" src={venue.picture} alt={venue.title}></img></div>

						</div>	
					</Fragment>
				: <Fragment></Fragment>
			}
	</Fragment>
	);
};

export default VenueDetail;