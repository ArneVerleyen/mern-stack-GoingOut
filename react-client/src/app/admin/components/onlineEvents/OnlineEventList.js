import { default as React, useEffect, useState, Fragment } from 'react';
import { default as classnames } from 'classnames';

import $ from 'jquery'; 

import { useApi } from '../../../services';
import { useToast } from '../../services';

import OnlineEventsTable from './OnlineEventsTable';

import './OnlineEventList.scss';

const OnlineEventList = ({children, className, limit = 10, skip = 1, onEdit}) => {  
  const { deleteOnlineEvent, findAllOnlineEvents } = useApi();
  const { addToast } = useToast();
  const [ onlineEvents, setOnlineEvents ] = useState();
  const [ currentPageIndex, setCurrentPageIndex ] = useState(skip);
  const [ pagination, setPagination ] = useState({
    limit,
    page: skip,
    pages: 1,
    total: 1
  });
  const [ onlineEventToDelete, setOnlineEventToDelete ] = useState(null);

  useEffect(() => {
    const fetchOnlineEvents = async () => {        
      const data = await findAllOnlineEvents({
        limit: pagination.limit,
        skip: currentPageIndex
      });
      setOnlineEvents(data.docs);
      setPagination({ 
        limit: data.limit, 
        page: data.page, 
        pages: data.pages, 
        total: data.total 
      });
    }

    if (onlineEventToDelete === null) {
      fetchOnlineEvents();
    }
    
  }, [findAllOnlineEvents, currentPageIndex, onlineEventToDelete, pagination.limit]);

  const handlePage = (ev, pageIndex) => {
    ev.preventDefault();

    setCurrentPageIndex(pageIndex);
  }

  const handleDelete = (onlineEventId, mode) => {
    setOnlineEventToDelete({
      onlineEvent: onlineEvents.find(onlineEvent => onlineEvent.id === onlineEventId),
      mode,
    });
    
    $('#confirmModal').modal('show');
  }

  const handleDeleteConfirm = async () => {
    const deletedOnlineEvent = await deleteOnlineEvent(onlineEventToDelete.onlineEvent.id, onlineEventToDelete.mode);

    addToast({
      title: `Admin: OnlineEvent`,
      message: `Succesfully ${onlineEventToDelete.mode} the onlineEvent with id ${deletedOnlineEvent.id} and title ${deletedOnlineEvent.title}`
    });

    $('#confirmModal').modal('hide');

    setOnlineEventToDelete(null);
  }

  const handleEdit = (onlineEventId) => {
    if (typeof onEdit === 'function') {
      onEdit(onlineEventId);
    }
  }

  return (
    <div className={className}>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">OnlineEvents</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <OnlineEventsTable onlineEvents={onlineEvents} onDelete={handleDelete} onEdit={handleEdit}  />
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
              <h5 className="modal-title" id="exampleModalLabel">{!!onlineEventToDelete ? (
                <Fragment>{onlineEventToDelete.mode} the selected onlineEvent</Fragment>
              ) : ''}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {!!onlineEventToDelete ? (
                <p>Dou yo wish to {onlineEventToDelete.mode} the onlineEvent with id: {onlineEventToDelete.onlineEvent.id} and title: {onlineEventToDelete.onlineEvent.title}?</p>
              ) : ''}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={ev => handleDeleteConfirm(ev)}>{!!onlineEventToDelete ? (
                <Fragment>{onlineEventToDelete.mode}</Fragment>
              ) : ''}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineEventList;