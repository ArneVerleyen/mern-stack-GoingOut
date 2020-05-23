import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import * as Routes from '../../routes';
import { UserEdit } from '../components';
import { useApi } from '../../services';
import { useToast } from '../services';

const UserEditPage = ({ children }) => {
  const { addToast } = useToast();
  const { id } = useParams();
  const { editUserViewModel, updateUser } = useApi();
  const [ userViewModel, setUserViewModel ] = useState(null);

  let history = useHistory();

  useEffect(() => {
    const fetchUserViewModel = async () => {        
      const data = await editUserViewModel(id);
      setUserViewModel(data);
    }

    fetchUserViewModel();    
  }, [editUserViewModel, id]);

  const handleOnUpdate = async (user) => {
    const updatedUser = await updateUser(user);
    addToast({
      title: `Administration: Update User`,
      message: `Successfully updated an existing user with id: ${updatedUser._id} and title: ${updatedUser.title}`
    });
    history.push(Routes.BACKOFFICE_USERS);
  }
  
  return (
    <div className="container">
      <div className="row">
        <UserEdit className="col-12 col-sm-12 col-md-12 col-lg-12 ol-xl-6 user-edit" viewModel={userViewModel} onUpdate={handleOnUpdate} />
      </div>
    </div>
  )
};
export default UserEditPage;