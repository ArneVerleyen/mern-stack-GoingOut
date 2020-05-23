import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import * as Routes from '../../routes';
import { VenueEdit } from '../components';
import { useApi } from '../../services';
import { useToast } from '../services';

const VenueEditPage = ({ children }) => {
  const { addToast } = useToast();
  const { id } = useParams();
  const { editVenueViewModel, updateVenue } = useApi();
  const [ venueViewModel, setVenueViewModel ] = useState(null);

  let history = useHistory();

  useEffect(() => {
    const fetchVenueViewModel = async () => {        
      const data = await editVenueViewModel(id);
      setVenueViewModel(data);
    }

    fetchVenueViewModel();    
  }, [editVenueViewModel, id]);

  const handleOnUpdate = async (venue) => {
    const updatedVenue = await updateVenue(venue);
    addToast({
      title: `Administration: Update Venue`,
      message: `Successfully updated an existing venue with id: ${updatedVenue._id} and title: ${updatedVenue.title}`
    });
    history.push(Routes.BACKOFFICE_VENUES);
  }
  
  return (
    <div className="container">
      <div className="row">
        <VenueEdit className="col-12 col-sm-12 col-md-12 col-lg-12 ol-xl-6 venue-edit" viewModel={venueViewModel} onUpdate={handleOnUpdate} />
      </div>
    </div>
  )
};
export default VenueEditPage;