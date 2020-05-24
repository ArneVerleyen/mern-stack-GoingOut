import { default as React, Fragment } from 'react';
import { default as moment } from 'moment';

import './onlineEventDetail.scss';

const OnlineEventDetail = ({ onlineEvent }) => {
	return (
		<Fragment>
			{!!onlineEvent
				? <Fragment>
						<div className="row onlineEvent-container">
							<article className="onlineEvent-detail col-md-12 col-lg-8">
								<h1 className="onlineEvent-title">{onlineEvent.title}</h1>
								<p className="onlineEvent-description">{onlineEvent.description}</p>
								<h1 className="onlineEvent-title">Info:</h1>
								<p>{onlineEvent.link}</p>
								<p>{onlineEvent.duration} {moment(onlineEvent.date).format('DD/MM/YYYY')}</p>
								<p>{onlineEvent.tags}</p>
								
							</article>

							<div className="col-lg-4 col-md-12"><img className="onlineEvent-img" src={onlineEvent.picture} alt={onlineEvent.title}></img></div>

						</div>	
					</Fragment>
				: <Fragment></Fragment>
			}
	</Fragment>
	);
};

export default OnlineEventDetail;