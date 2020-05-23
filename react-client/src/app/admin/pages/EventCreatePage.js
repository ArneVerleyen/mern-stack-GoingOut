import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import * as Routes from '../../routes';
import { EventEdit } from '../components';
import { useApi } from '../../services';
import { useToast } from '../services';


const EventCreatePage = ({ children }) => {
  const { addToast } = useToast();
  const { createEventViewModel, storeEvent } = useApi();
  const [ eventViewModel, setEventViewModel ] = useState(null);

  let history = useHistory();

  useEffect(() => {
    const fetchEventViewModel = async () => {        
      const data = await createEventViewModel();
      setEventViewModel(data);
    }

    fetchEventViewModel();    
  }, [createEventViewModel]);

  const handleOnSave = async (event) => {
    const storedEvent = await storeEvent(event);
    addToast({
      title: `Administration: New Event`,
      message: `Successfully created a new event with id: ${storedEvent._id} and title: ${storedEvent.title}`
    });
    history.push(Routes.BACKOFFICE_EVENTS);
  }
  
  return (
    <div className="container">
      <div className="row">
        <EventEdit className="col-12 col-sm-12 col-md-12 col-lg-12 ol-xl-6 event-edit" viewModel={eventViewModel} onSave={handleOnSave} />
      </div>
    </div>
  )
};
export default EventCreatePage;