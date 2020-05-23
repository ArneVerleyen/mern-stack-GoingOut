import { default as React } from 'react';

import { Link ,useHistory } from 'react-router-dom';

import * as Routes from '../../routes';
import { EventList } from '../components/events';

const EventsPage = ({children}) => {
	let history = useHistory();

  const handleEdit = (eventId) => {
    history.push(Routes.BACKOFFICE_EVENTS_EDIT.replace(':id', eventId));
  };

	return(
		<div className="container">
			<div className='row'>
				<div className="col-12">
					<Link className="btn btn-primary" to={Routes.BACKOFFICE_EVENTS_CREATE}>Create Event</Link> 
				</div>
				<EventList className="col-12 col-sm-12 col-md-12 col-lg-12 ol-xl-6 post-list" limit={10} skip={1} onEdit={handleEdit}  />

			</div>
			

		</div>
	);
}

export default EventsPage;