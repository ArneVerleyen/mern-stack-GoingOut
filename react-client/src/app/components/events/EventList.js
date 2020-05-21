import { default as React, useCallback, useEffect, useState} from 'react';
import { default as classnames } from 'classnames';
import { useApi } from '../../services';

const EventListPaged = ({children, amount, onReadMore, className, ...rest }) => {
  const { findAllEvents } = useApi();
	const [ events, setEvents ] = useState();
	const [ pagination, setPagination ] = useState({
		limit:12,
		page:1,
		pages:1,
		total:1,
	});
	const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const initFetch = useCallback(
    () => {
			const options = {
				limit: pagination.limit,
				skip: currentPageIndex,
			};
      const fetchEvents = async () => {
        const data = await findAllEvents(options);
				setEvents(data.docs);
				setPagination({
					limit: data.limit,
					page: data.page,
					pages: data.pages,
					total: data.total,
				});
				
      }

      fetchEvents();
    },
    [findAllEvents, currentPageIndex, pagination.limit],
  )

  useEffect(() => {
    initFetch();

    return () => {
      // no cleanup
    }
  }, [initFetch]);
  
  const handleReadMore = (ev, eventId) => {
    ev.preventDefault();
    if (typeof onReadMore === 'function') {
      onReadMore(eventId);
    }
	};
	
	const handleLoadMore = (ev, pageIndex) => {
    ev.preventDefault();
    setCurrentPageIndex(pageIndex);
  }

  return (
    <div className={classnames('row event-list', className)}>
      {events && events.map((event, index) => (
        <div className="col-12 col-sm-12 col-md-6 col-lg-4" key={index}>
          <article className="card" key={event._id}>
            <picture className="card-img-top">
              <img src={event.picture} alt={event.title} />
            </picture>
            <div className="card-body">
              <h5 className="card-title">{event.title}</h5>
							<p>{}</p>
              
              <button href="#" className="btn btn-primary" onClick={ev => handleReadMore(ev, event._id)}>Lees meer</button>
            </div>
          </article>
        </div>
        
      ))}
			{events && pagination.page < pagination.pages ? <button onClick={ev => handleLoadMore(ev, pagination.page + 1)}>meer laden...</button> : ''}
    </div>
  );
};

export default EventListPaged; 