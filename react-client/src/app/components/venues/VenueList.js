import { default as React, useCallback, useEffect, useState} from 'react';
import { default as classnames } from 'classnames';
import { useApi } from '../../services';

import './venueList.scss';

const VenueList = ({children, amount, onReadMore, className, paged, ...rest }) => {
  const { findAllVenues } = useApi();
	const [ venues, setVenues ] = useState();
	
	const [pagination, setPagination] = useState({
		limit: paged.limit,
		page: paged.skip,
		pages:1,
		total:1
	});

const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const initFetch = useCallback(
    () => {
			const options = {
				limit: pagination.limit,
				skip: currentPageIndex,
			};
      const fetchVenues = async () => {
        const data = await findAllVenues(options);
				setVenues(data.docs); //.docs na paginering
				setPagination({
					limit: data.limit,
					page:data.page,
					pages: data.pages,
					total: data.total,
				});
      }

      fetchVenues();
    },
    [findAllVenues, currentPageIndex, pagination.limit, amount],
  )

  useEffect(() => {
    initFetch();

    return () => {
      // no cleanup
    }
  }, [initFetch]);
  
  const handleReadMore = (ev, venueId) => {
    ev.preventDefault();
    if (typeof onReadMore === 'function') {
      onReadMore(venueId);
    }
	};
	
	const handleLoadMore = (ev, pageIndex) => {
    ev.preventDefault();
    setCurrentPageIndex(pageIndex);
	}

  return (
    <div className={classnames('row venue-list', className)}>
      {venues && venues.map((venue, index) => (
        <div className="col-sm-12 col-md-4 col-lg-3 outer-card " key={index}>
          <article className="card" key={venue._id}>
            <picture className="card-img-top">
            	 <img src={venue.picture} alt={venue.title}></img>
            </picture>
            <div className="card-body">
              <h5 className="card-title">{venue.name}</h5>
              <button href="#" className="card-btn" onClick={ev => handleReadMore(ev, venue._id)}>Lees meer</button>
            </div>
          </article>
        </div>
        
      ))}
			{venues && pagination.page < pagination.pages ? <button className="col-12 btn-next-page" onClick={ev => handleLoadMore(ev, pagination.page + 1)}>meer laden...</button> : ''}
    </div>
  );
};

export default VenueList;