import { default as React, useEffect, useState, Fragment } from 'react';
import { default as classnames } from 'classnames';

import $ from 'jquery'; 

import { useApi } from '../../../services';
import { useToast } from '../../services';

import UsersTable from './UsersTable';

import './UserList.scss';

const UserList = ({children, className, onEdit}) => {  
  const { deleteUser, findAllUsers } = useApi();
  const { addToast } = useToast();
  const [ users, setUsers ] = useState();

  const [ userToDelete, setUserToDelete ] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {        
      const data = await findAllUsers();
			setUsers(data);
		}
		

    if (userToDelete === null) {
      fetchUsers();
    }
    
  }, [findAllUsers, userToDelete,]); //currentPageIndex, pagination.limit]);


  const handleDelete = (userId, mode) => {
    setUserToDelete({
      user: users.find(user => user.id === userId),
      mode,
    });
    
    $('#confirmModal').modal('show');
  }

  const handleDeleteConfirm = async () => {
    const deletedUser = await deleteUser(userToDelete.user.id, userToDelete.mode);

    addToast({
      title: `Admin: User`,
      message: `Succesfully ${userToDelete.mode} the user with id ${deletedUser.id} and title ${deletedUser.email}`
    });

    $('#confirmModal').modal('hide');

    setUserToDelete(null);
  }

  const handleEdit = (userId) => {
    if (typeof onEdit === 'function') {
      onEdit(userId);
    }
	}

  return (
    <div className={className}>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Users</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <UsersTable users={users} onDelete={handleDelete} onEdit={handleEdit}  />
          </div>          
        </div>
        <div className="card-footer">
        </div>
      </div>
      <div className="modal fade" id="confirmModal" tabIndex="-1" role="dialog" aria-labelledby="confirmModal" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{!!userToDelete ? (
                <Fragment>{userToDelete.mode} the selected user</Fragment>
              ) : ''}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {!!userToDelete ? (
                <p>Dou yo wish to {userToDelete.mode} the user with id: {userToDelete.user.id} and title: {userToDelete.user.profile.firstName}?</p>
              ) : ''}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={ev => handleDeleteConfirm(ev)}>{!!userToDelete ? (
                <Fragment>{userToDelete.mode}</Fragment>
              ) : ''}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;