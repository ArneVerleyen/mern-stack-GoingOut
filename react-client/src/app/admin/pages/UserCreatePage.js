import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import * as Routes from '../../routes';
import { UserEdit } from '../components';
import { useApi } from '../../services';
import { useToast } from '../services';


const UserCreatePage = ({ children }) => {
  const { addToast } = useToast();
  const { createUserViewModel, storeUser } = useApi();
  const [ userViewModel, setUserViewModel ] = useState(null);

  let history = useHistory();

  useEffect(() => {
    const fetchUserViewModel = async () => {        
      const data = await createUserViewModel();
      setUserViewModel(data);
    }

    fetchUserViewModel();    
  }, [createUserViewModel]);

  const handleOnSave = async (user) => {
    const storedUser = await storeUser(user);
    addToast({
      title: `Administration: New User`,
      message: `Successfully created a new user with id: ${storedUser._id} and title: ${storedUser.title}`
    });
    history.push(Routes.BACKOFFICE_USERS);
  }
  
  return (
    <div className="container">
      <div className="row">
        <UserEdit className="col-12 col-sm-12 col-md-12 col-lg-12 ol-xl-6 user-edit" viewModel={userViewModel} onSave={handleOnSave} />
      </div>
    </div>
  )
};
export default UserCreatePage;