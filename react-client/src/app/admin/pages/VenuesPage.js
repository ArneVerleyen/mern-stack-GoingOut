import { default as React } from 'react';

import { Link ,useHistory } from 'react-router-dom';

import * as Routes from '../../routes';
import { VenueList } from '../components/venues';

const VenuesPage = ({children}) => {
	let history = useHistory();

  const handleEdit = (venueId) => {
    history.push(Routes.BACKOFFICE_VENUES_EDIT.replace(':id', venueId));
  };

	return(
		<div className="container">
			<div className='row'>
				<div className="col-12">
					<Link className="btn btn-primary" to={Routes.BACKOFFICE_VENUES_CREATE}>Create Venue</Link> 
				</div>
				<VenueList className="col-12 col-sm-12 col-md-12 col-lg-12 ol-xl-6 post-list" limit={10} skip={1} onEdit={handleEdit}  />

			</div>
			

		</div>
	);
}

export default VenuesPage;