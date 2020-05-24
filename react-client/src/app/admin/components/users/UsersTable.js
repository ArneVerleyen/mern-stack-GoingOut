import { default as React } from 'react';
import { default as classnames } from 'classnames';
import { default as moment } from 'moment';

const UsersTable = ({children, users, onDelete, onEdit}) => {

  const handleDelete = (user, userId, deleteMode = 0) => {
    if (typeof onDelete === 'function') {
      onDelete(userId, deleteMode);
    }
  };

  const handleEdit = (user, userId) => {
    if (typeof onEdit === 'function') {
      onEdit(userId);
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          
          <th>e-mail</th>
          <th>profile</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users && users.map(user => (
          <tr
						key={user._id}
						
          >
            
            <td>{user.email}</td>
            <td>{user.profile.firstName+' '+user.profile.lastName}</td>
            <td>
              {moment(users._createdAt).format('DD/MM/YYYY')}
            </td>
            <td className="d-flex justify-content-around">
              <a href="#" aria-label="edit" onClick={ev => handleEdit(ev, user.id)}><i className="fas fa-edit"></i></a>
              <a href="#" className={classnames(user._deletedAt === null ? 'soft-deleted' : 'soft-undeleted')} aria-label="delete" onClick={ev => handleDelete(ev, user.id, user._deletedAt === null ? 'softdelete' : 'softundelete', 'delete')}><i className="fas fa-trash-alt"></i></a>
              <a href="#" aria-label="delete-forever" onClick={ev => handleDelete(ev, user.id, 'delete')}><i className="fas fa-trash"></i></a>              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;