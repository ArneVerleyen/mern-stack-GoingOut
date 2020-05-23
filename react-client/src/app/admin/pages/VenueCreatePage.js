import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import * as Routes from '../../routes';
import { VenueEdit } from '../components';
import { useApi } from '../../services';
import { useToast } from '../services';


const VenueCreatePage = ({ children }) => {
  const { addToast } = useToast();
  const { createVenueViewModel, storeVenue } = useApi();
  const [ venueViewModel, setVenueViewModel ] = useState(null);

  let history = useHistory();

  useEffect(() => {
    const fetchVenueViewModel = async () => {        
      const data = await createVenueViewModel();
      setVenueViewModel(data);
    }

    fetchVenueViewModel();    
  }, [createVenueViewModel]);

  const handleOnSave = async (venue) => {
    const storedVenue = await storeVenue(venue);
    addToast({
      title: `Administration: New Venue`,
      message: `Successfully created a new venue with id: ${storedVenue._id} and title: ${storedVenue.title}`
    });
    history.push(Routes.BACKOFFICE_VENUES);
  }
  
  return (
    <div className="container">
      <div className="row">
        <VenueEdit className="col-12 col-sm-12 col-md-12 col-lg-12 ol-xl-6 venue-edit" viewModel={venueViewModel} onSave={handleOnSave} />
      </div>
    </div>
  )
};
export default VenueCreatePage;