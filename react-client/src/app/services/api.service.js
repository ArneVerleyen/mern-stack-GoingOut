import { default as React, useContext, createContext } from 'react';

import { apiConfig } from '../config';

const ApiContext = createContext();
const useApi = () => useContext(ApiContext);

const ApiProvider = ({children}) => {
  const BASE_URL = `${apiConfig.baseURL}`;

  const findAllEvents = async (query = null) => {
    let url = `${BASE_URL}/events`;
    if (query !== null) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(query);
    }
    const response = await fetch(url);
    return response.json();
  }

  const findEvent = async (id) => {
    let url = `${BASE_URL}/events/${id}`;
    const response = await fetch(url);
    return response.json();
  }

  const createEventViewModel = async (event) => {
    let url = `${BASE_URL}/events/create`;
    const response = await fetch(url);
    return response.json();
  }

  const storeEvent = async (event) => {
    const options = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    };

    let url = `${BASE_URL}/events`;
    const response = await fetch(url, options);
    return response.json();
  }

  const editEventViewModel = async (eventId) => {
    const options = {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    };

    let url = `${BASE_URL}/events/${eventId}/edit`;
    const response = await fetch(url, options);
    return response.json();
  }

  const updateEvent = async (event) => {
    const options = {
      method: "put",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    };

    let url = `${BASE_URL}/events/${event._id}`;
    const response = await fetch(url, options);
    return response.json();
  }

  const deleteEvent = async (id, mode = 0) => {
    const options = {
      method: "delete",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
    const response = await fetch(`${BASE_URL}/events/${id}?mode=${mode}`, options);
    return await response.json();
	}
	
	/*
	 *	Api service for venues 
	 */

	

	const findAllVenues = async (query = null) => {
		let url = `${BASE_URL}/venues`;
		if (query !== null) {
			url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(query);
		}
		const response = await fetch(url);
		return response.json();
	}

	const findVenue = async (id) => {
		let url = `${BASE_URL}/venues/${id}`;
		const response = await fetch(url);
		return response.json();
	}

	const createVenueViewModel = async (venue) => {
		let url = `${BASE_URL}/venues/create`;
		const response = await fetch(url);
		return response.json();
	}

	const storeVenue = async (venue) => {
		const options = {
			method: "post",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(venue)
		};

		let url = `${BASE_URL}/venues`;
		const response = await fetch(url, options);
		return response.json();
	}

	const editVenueViewModel = async (venueId) => {
		const options = {
			method: "get",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		};

		let url = `${BASE_URL}/venues/${venueId}/edit`;
		const response = await fetch(url, options);
		return response.json();
	}

	const updateVenue = async (venue) => {
		const options = {
			method: "put",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(venue)
		};

		let url = `${BASE_URL}/venues/${venue._id}`;
		const response = await fetch(url, options);
		return response.json();
	}

	const deleteVenue = async (id, mode = 0) => {
		const options = {
			method: "delete",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		}
		const response = await fetch(`${BASE_URL}/venues/${id}?mode=${mode}`, options);
		return await response.json();
	}

	/*
	 * Api Categories
	 */

	const findAllCategories = async (query = null) => {
		let url = `${BASE_URL}/categories`;
		if (query !== null) {
			url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(query);
		}
		const response = await fetch(url);
		return response.json();
	}

	const findCategory = async (id) => {
		let url = `${BASE_URL}/categories/${id}`;
		const response = await fetch(url);
		return response.json();
	}

	const createCategoryViewModel = async (category) => {
		let url = `${BASE_URL}/categories/create`;
		const response = await fetch(url);
		return response.json();
	}

	const storeCategory = async (category) => {
		const options = {
			method: "post",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(category)
		};

		let url = `${BASE_URL}/categories`;
		const response = await fetch(url, options);
		return response.json();
	}

	const editCategoryViewModel = async (categoryId) => {
		const options = {
			method: "get",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		};

		let url = `${BASE_URL}/categories/${categoryId}/edit`;
		const response = await fetch(url, options);
		return response.json();
	}

	const updateCategory = async (category) => {
		const options = {
			method: "put",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(category)
		};

		let url = `${BASE_URL}/categories/${category._id}`;
		const response = await fetch(url, options);
		return response.json();
	}

	const deleteCategory = async (id, mode = 0) => {
		const options = {
			method: "delete",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		}
		const response = await fetch(`${BASE_URL}/categories/${id}?mode=${mode}`, options);
		return await response.json();
	}
	
	/*
	 * Api services Users
	 */

	const findAllUsers = async (query = null) => {
		let url = `${BASE_URL}/users`;
		if (query !== null) {
			url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(query);
		}
		const response = await fetch(url);
		return response.json();
	}

	const findUser = async (id) => {
		let url = `${BASE_URL}/users/${id}`;
		const response = await fetch(url);
		return response.json();
	}

	const createUserViewModel = async (user) => {
		let url = `${BASE_URL}/users/create`;
		const response = await fetch(url);
		return response.json();
	}

	const storeUser = async (user) => {
		const options = {
			method: "post",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		};

		let url = `${BASE_URL}/users`;
		const response = await fetch(url, options);
		return response.json();
	}

	const editUserViewModel = async (userId) => {
		const options = {
			method: "get",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		};

		let url = `${BASE_URL}/users/${userId}/edit`;
		const response = await fetch(url, options);
		return response.json();
	}

	const updateUser = async (user) => {
		const options = {
			method: "put",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		};

		let url = `${BASE_URL}/users/${user._id}`;
		const response = await fetch(url, options);
		return response.json();
	}

	const deleteUser = async (id, mode = 0) => {
		const options = {
			method: "delete",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		}
		const response = await fetch(`${BASE_URL}/users/${id}?mode=${mode}`, options);
		return await response.json();
	}

	

  const queryParams = (options) => {
    return Object.keys(options)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(options[key])).join('&');
  }

  return (
		<ApiContext.Provider value={{ createEventViewModel, deleteEvent, findAllEvents,
		 findEvent, storeEvent, editEventViewModel, updateEvent,
			findAllVenues, findVenue, createVenueViewModel, updateVenue,
			deleteVenue, editVenueViewModel, storeVenue, findAllCategories, findCategory,
			createCategoryViewModel, storeCategory, editCategoryViewModel, updateCategory, deleteCategory,
			findAllUsers,findUser, createUserViewModel, storeUser, editUserViewModel,
			updateUser, deleteUser  }}>
      {children}
    </ApiContext.Provider>
  );
};

export {
  ApiContext,
  ApiProvider,
  useApi,
}