import { default as React } from 'react';
import { default as classnames } from 'classnames';
import { default as moment } from 'moment';

const VenuesTable = ({children, venues, onDelete, onEdit}) => {

  const handleDelete = (venue, venueId, deleteMode = 0) => {
    if (typeof onDelete === 'function') {
      onDelete(venueId, deleteMode);
    }
  };

  const handleEdit = (venue, venueId) => {
    if (typeof onEdit === 'function') {
      onEdit(venueId);
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
        {venues && venues.map(venue => (
          <tr
            key={venue.id}
          >
           
            <td>{venue.name}</td>
            <td>{venue.description}</td>
            <td>
              {moment(venues._createdAt).format('DD/MM/YYYY')}
            </td>
            <td className="d-flex justify-content-around">
              <a href="#" aria-label="edit" onClick={ev => handleEdit(ev, venue.id)}><i className="fas fa-edit"></i></a>
              <a href="#" className={classnames(venue._deletedAt === null ? 'soft-deleted' : 'soft-undeleted')} aria-label="delete" onClick={ev => handleDelete(ev, venue.id, venue._deletedAt === null ? 'softdelete' : 'softundelete', 'delete')}><i className="fas fa-trash-alt"></i></a>
              <a href="#" aria-label="delete-forever" onClick={ev => handleDelete(ev, venue.id, 'delete')}><i className="fas fa-trash"></i></a>              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VenuesTable;