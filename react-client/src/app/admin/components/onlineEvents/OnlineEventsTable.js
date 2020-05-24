import { default as React } from 'react';
import { default as classnames } from 'classnames';
import { default as moment } from 'moment';

const OnlineEventsTable = ({children, onlineEvents, onDelete, onEdit}) => {

  const handleDelete = (onlineEvent, onlineEventId, deleteMode = 0) => {
    if (typeof onDelete === 'function') {
      onDelete(onlineEventId, deleteMode);
    }
  };

  const handleEdit = (onlineEvent, onlineEventId) => {
    if (typeof onEdit === 'function') {
      onEdit(onlineEventId);
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
      
          <th>Title</th>
          <th>Synopsis</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {onlineEvents && onlineEvents.map(onlineEvent => (
          <tr
            key={onlineEvent.id}
          >
       
            <td>{onlineEvent.title}</td>
            <td>{onlineEvent.description}</td>
            <td>
              {moment(onlineEvents._createdAt).format('DD/MM/YYYY')}
            </td>
            <td className="d-flex justify-content-around">
              <a href="#" aria-label="edit" onClick={ev => handleEdit(ev, onlineEvent.id)}><i className="fas fa-edit"></i></a>
              <a href="#" className={classnames(onlineEvent._deletedAt === null ? 'soft-deleted' : 'soft-undeleted')} aria-label="delete" onClick={ev => handleDelete(ev, onlineEvent.id, onlineEvent._deletedAt === null ? 'softdelete' : 'softundelete', 'delete')}><i className="fas fa-trash-alt"></i></a>
              <a href="#" aria-label="delete-forever" onClick={ev => handleDelete(ev, onlineEvent.id, 'delete')}><i className="fas fa-trash"></i></a>              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OnlineEventsTable;