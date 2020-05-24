import { default as React, useCallback, useEffect, useState} from 'react';
import { default as classnames } from 'classnames';
import { useApi } from '../../services';
import { default as moment } from 'moment';


const OnlineEventListPaged = ({children, amount, onReadMore, className, paged, ...rest }) => {
	const { findAllOnlineEvents } = useApi();

	const [ onlineEvents, setOnlineEvents ] = useState();

	const [ pagination, setPagination ] = useState({
		limit: paged.limit,
		page: paged.skip,
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
      const fetchOnlineEvents = async () => {
        const data = await findAllOnlineEvents(options);
				setOnlineEvents(data.docs);
				setPagination({
					limit: data.limit,
					page: data.page,
					pages: data.pages,
					total: data.total,
				});
				
			}


			fetchOnlineEvents();
		
    },
    [findAllOnlineEvents, currentPageIndex, pagination.limit,],
  )

  useEffect(() => {
    initFetch();

    return () => {
      // no cleanup
    }
  }, [initFetch]);
  
  const handleReadMore = (ev, onlineEventId) => {
    ev.preventDefault();
    if (typeof onReadMore === 'function') {
      onReadMore(onlineEventId);
    }
	};
	
	const handleLoadMore = (ev, pageIndex) => {
    ev.preventDefault();
    setCurrentPageIndex(pageIndex);
	}
	
  return (
    <div className={classnames('row onlineEvent-list', className)}>
      {onlineEvents && onlineEvents.map((onlineEvent, index) => (
        <div className="col-sm-12 col-md-4 col-lg-3 outer-card" key={index}>
          <article className="card" key={onlineEvent._id}>
            <picture className="card-img-top">
              <img src={onlineEvent.picture} alt={onlineEvent.title} />
            </picture>
            <div className="card-body">
							<p>{moment(onlineEvent.date).format('DD/MM/YYYY')}</p>
              <h5 className="card-title">{onlineEvent.title}</h5>
              <button href="#" className="card-btn" onClick={ev => handleReadMore(ev, onlineEvent._id)}>Lees meer...</button>
            </div>
          </article>
        </div>
        
      ))}
			{onlineEvents && pagination.page < pagination.pages ? <button className="col-12 btn-next-page" onClick={ev => handleLoadMore(ev, pagination.page + 1)}>meer laden...</button> : ''}
    </div>
  );
};

export default OnlineEventListPaged; 