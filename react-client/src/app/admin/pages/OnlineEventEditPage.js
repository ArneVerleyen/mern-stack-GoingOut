import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import * as Routes from '../../routes';
import { OnlineEventEdit } from '../components';
import { useApi } from '../../services';
import { useToast } from '../services';

const OnlineEventEditPage = ({ children }) => {
  const { addToast } = useToast();
  const { id } = useParams();
  const { editOnlineEventViewModel, updateOnlineEvent } = useApi();
  const [ onlineEventViewModel, setOnlineEventViewModel ] = useState(null);

  let history = useHistory();

  useEffect(() => {
    const fetchOnlineEventViewModel = async () => {        
      const data = await editOnlineEventViewModel(id);
      setOnlineEventViewModel(data);
    }

    fetchOnlineEventViewModel();    
  }, [editOnlineEventViewModel, id]);

  const handleOnUpdate = async (onlineEvent) => {
    const updatedOnlineEvent = await updateOnlineEvent(onlineEvent);
    addToast({
      title: `Administration: Update OnlineEvent`,
      message: `Successfully updated an existing onlineEvent with id: ${updatedOnlineEvent._id} and title: ${updatedOnlineEvent.title}`
    });
    history.push(Routes.BACKOFFICE_ONLINE_EVENTS);
  }
  
  return (
    <div className="container">
      <div className="row">
        <OnlineEventEdit className="col-12 col-sm-12 col-md-12 col-lg-12 ol-xl-6 onlineEvent-edit" viewModel={onlineEventViewModel} onUpdate={handleOnUpdate} />
      </div>
    </div>
  )
};
export default OnlineEventEditPage;