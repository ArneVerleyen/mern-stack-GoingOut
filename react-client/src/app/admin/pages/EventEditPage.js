import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import * as Routes from '../../routes';
import { EventEdit } from '../components';
import { useApi } from '../../services';
import { useToast } from '../services';

const EventEditPage = ({ children }) => {
  const { addToast } = useToast();
  const { id } = useParams();
  const { editEventViewModel, updateEvent } = useApi();
  const [ eventViewModel, setEventViewModel ] = useState(null);

  let history = useHistory();

  useEffect(() => {
    const fetchEventViewModel = async () => {        
      const data = await editEventViewModel(id);
      setEventViewModel(data);
    }

    fetchEventViewModel();    
  }, [editEventViewModel, id]);

  const handleOnUpdate = async (event) => {
    const updatedEvent = await updateEvent(event);
    addToast({
      title: `Administration: Update Event`,
      message: `Successfully updated an existing event with id: ${updatedEvent._id} and title: ${updatedEvent.title}`
    });
    history.push(Routes.BACKOFFICE_EVENTS);
  }
  
  return (
    <div className="container">
      <div className="row">
        <EventEdit className="col-12 col-sm-12 col-md-12 col-lg-12 ol-xl-6 event-edit" viewModel={eventViewModel} onUpdate={handleOnUpdate} />
      </div>
    </div>
  )
};
export default EventEditPage;