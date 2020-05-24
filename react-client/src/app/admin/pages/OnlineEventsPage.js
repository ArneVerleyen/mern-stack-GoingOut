import { default as React } from 'react';

import { Link ,useHistory } from 'react-router-dom';

import * as Routes from '../../routes';
import { OnlineEventList } from '../components/onlineEvents';

const OnlineEventsPage = ({children}) => {
	let history = useHistory();

  const handleEdit = (onlineEventId) => {
    history.push(Routes.BACKOFFICE_ONLINE_EVENTS_EDIT.replace(':id', onlineEventId));
  };

	return(
		<div className="container">
			<div className='row'>
				<div className="col-12">
					<Link className="btn btn-primary" to={Routes.BACKOFFICE_ONLINE_EVENTS_CREATE}>Create OnlineEvent</Link> 
				</div>
				<OnlineEventList className="col-12 col-sm-12 col-md-12 col-lg-12 ol-xl-6 post-list" limit={10} skip={1} onEdit={handleEdit}  />

			</div>
			

		</div>
	);
}

export default OnlineEventsPage;