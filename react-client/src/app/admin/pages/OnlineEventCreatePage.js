import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import * as Routes from '../../routes';
import { OnlineEventEdit } from '../components';
import { useApi } from '../../services';
import { useToast } from '../services';


const OnlineEventCreatePage = ({ children }) => {
  const { addToast } = useToast();
  const { createOnlineEventViewModel, storeOnlineEvent } = useApi();
  const [ onlineEventViewModel, setOnlineEventViewModel ] = useState(null);

  let history = useHistory();

  useEffect(() => {
    const fetchOnlineEventViewModel = async () => {        
      const data = await createOnlineEventViewModel();
      setOnlineEventViewModel(data);
    }

    fetchOnlineEventViewModel();    
  }, [createOnlineEventViewModel]);

  const handleOnSave = async (onlineEvent) => {
    const storedOnlineEvent = await storeOnlineEvent(onlineEvent);
    addToast({
      title: `Administration: New OnlineEvent`,
      message: `Successfully created a new onlineEvent with id: ${storedOnlineEvent._id} and title: ${storedOnlineEvent.title}`
    });
    history.push(Routes.BACKOFFICE_ONLINE_EVENTS);
  }
  
  return (
    <div className="container">
      <div className="row">
        <OnlineEventEdit className="col-12 col-sm-12 col-md-12 col-lg-12 ol-xl-6 onlineEvent-edit" viewModel={onlineEventViewModel} onSave={handleOnSave} />
      </div>
    </div>
  )
};
export default OnlineEventCreatePage;