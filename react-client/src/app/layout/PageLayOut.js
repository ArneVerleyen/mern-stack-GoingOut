import { default as React } from 'react';
// eigen imports
import { Header, Footer } from '../components';

const PageLayout = ({children}) => {
	return (
		<div className="page">

			<Header/>

			<main className="page_main">
				{children}
			</main>

			<Footer/>

		</div>
	);
};

export default PageLayout;