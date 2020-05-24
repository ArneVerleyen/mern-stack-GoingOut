import { default as React, Fragment } from 'react';
import { default as moment } from 'moment';

import './eventDetail.scss';

const EventDetail = ({ event }) => {
	return (
		<Fragment>
			{!!event
				? <Fragment>
						<div className="row event-container">
							<article className="event-detail col-md-12 col-lg-8">
								<h1 className="event-title">{event.title}</h1>
								<p className="event-description">{event.description}</p>
								<h1 className="event-title">Info:</h1>
								<p>{event.location} {event.city}</p>
								<p>{event.street} {event.houseNumber}</p>
								<p>{event.tags}</p>
								<p>{moment(event.date).format('DD/MM/YYYY')}</p>
								
							</article>

							<div className="col-lg-4 col-md-12"><img className="event-img" src={event.picture} alt={event.title}></img></div>

						</div>	
					</Fragment>
				: <Fragment></Fragment>
			}
	</Fragment>
	);
};

export default EventDetail;