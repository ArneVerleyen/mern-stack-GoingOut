import { default as React, useEffect, useState, useContext, createContext } from 'react';

const ApiContext = createContext();
const useApi = () => useContext(Apicontext());

const ApiProvider = ({children}) => {
	return (
		<ApiContext.Consumer value={{}}>
			{children}
		</ApiContext.Consumer>
	);
};

export {
	ApiContext,
	ApiProvider,
	useApi,
}