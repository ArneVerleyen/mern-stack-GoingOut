import { default as React } from 'react';
import { default as classnames } from 'classnames';
import { default as moment } from 'moment';

const EventsTable = ({children, events, onDelete, onEdit}) => {

  const handleDelete = (event, eventId, deleteMode = 0) => {
    if (typeof onDelete === 'function') {
      onDelete(eventId, deleteMode);
    }
  };

  const handleEdit = (event, eventId) => {
    if (typeof onEdit === 'function') {
      onEdit(eventId);
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>Title</th>
          <th>Synopsis</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {events && events.map(event => (
          <tr
            key={event.id}
          >
            <td>
              CHKB
            </td>
            <td>{event.title}</td>
            <td>{event.description}</td>
            <td>
              {moment(events._createdAt).format('DD/MM/YYYY')}
            </td>
            <td className="d-flex justify-content-around">
              <a href="#" aria-label="edit" onClick={ev => handleEdit(ev, event.id)}><i className="fas fa-edit"></i></a>
              <a href="#" className={classnames(event._deletedAt === null ? 'soft-deleted' : 'soft-undeleted')} aria-label="delete" onClick={ev => handleDelete(ev, event.id, event._deletedAt === null ? 'softdelete' : 'softundelete', 'delete')}><i className="fas fa-trash-alt"></i></a>
              <a href="#" aria-label="delete-forever" onClick={ev => handleDelete(ev, event.id, 'delete')}><i className="fas fa-trash"></i></a>              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventsTable;