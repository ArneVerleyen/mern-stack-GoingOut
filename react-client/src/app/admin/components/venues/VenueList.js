import { default as React, useEffect, useState, Fragment } from 'react';
import { default as classnames } from 'classnames';

import $ from 'jquery'; 

import { useApi } from '../../../services';
import { useToast } from '../../services';

import VenuesTable from './VenuesTable';

import './VenueList.scss';

const VenueList = ({children, className, limit = 10, skip = 1, onEdit}) => {  
  const { deleteVenue, findAllVenues } = useApi();
  const { addToast } = useToast();
  const [ venues, setVenues ] = useState();
  const [ currentPageIndex, setCurrentPageIndex ] = useState(skip);
  const [ pagination, setPagination ] = useState({
    limit,
    page: skip,
    pages: 1,
    total: 1
  });
  const [ venueToDelete, setVenueToDelete ] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {        
      const data = await findAllVenues({
        limit: pagination.limit,
        skip: currentPageIndex
      });
      setVenues(data.docs);
      setPagination({ 
        limit: data.limit, 
        page: data.page, 
        pages: data.pages, 
        total: data.total 
      });
    }

    if (venueToDelete === null) {
      fetchVenues();
    }
    
  }, [findAllVenues, currentPageIndex, venueToDelete, pagination.limit]);

  const handlePage = (ev, pageIndex) => {
    ev.prvenueDefault();

    setCurrentPageIndex(pageIndex);
  }

  const handleDelete = (venueId, mode) => {
    setVenueToDelete({
      venue: venues.find(venue => venue.id === venueId),
      mode,
    });
    
    $('#confirmModal').modal('show');
  }

  const handleDeleteConfirm = async () => {
    const deletedVenue = await deleteVenue(venueToDelete.venue.id, venueToDelete.mode);

    addToast({
      title: `Admin: Venue`,
      message: `Succesfully ${venueToDelete.mode} the venue with id ${deletedVenue.id} and title ${deletedVenue.name}`
    });

    $('#confirmModal').modal('hide');

    setVenueToDelete(null);
  }

  const handleEdit = (venueId) => {
    if (typeof onEdit === 'function') {
      onEdit(venueId);
    }
  }

  return (
    <div className={className}>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Venues</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <VenuesTable venues={venues} onDelete={handleDelete} onEdit={handleEdit}  />
          </div>          
        </div>
        <div className="card-footer">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
              {(pagination.page > 1) ? (<li className="page-item"><button className="page-link" onClick={ev => handlePage(ev, pagination.page - 1)}>Previous</button></li>) : ''}
              {
                Array(pagination.pages).fill(true).map((item, index) => (
                  <li key={index} className={classnames('page-item', (pagination.page === index + 1) ? 'active' : '' )}><button className="page-link" onClick={ev => handlePage(ev, index + 1)}>{index + 1}</button></li>
                ))
              }
              {(pagination.page !== pagination.pages) ? (<li className="page-item"><button className="page-link" onClick={ev => handlePage(ev, pagination.page + 1)}>Next</button></li>) : ''}                
            </ul>
          </nav>
        </div>
      </div>
      <div className="modal fade" id="confirmModal" tabIndex="-1" role="dialog" aria-labelledby="confirmModal" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{!!venueToDelete ? (
                <Fragment>{venueToDelete.mode} the selected venue</Fragment>
              ) : ''}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {!!venueToDelete ? (
                <p>Dou yo wish to {venueToDelete.mode} the venue with id: {venueToDelete.venue.id} and title: {venueToDelete.venue.name}?</p>
              ) : ''}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={ev => handleDeleteConfirm(ev)}>{!!venueToDelete ? (
                <Fragment>{venueToDelete.mode}</Fragment>
              ) : ''}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueList;