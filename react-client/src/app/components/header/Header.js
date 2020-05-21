import { default as React } from 'react';

import Navigation from './Navigation';
import { default as DropdownMenu } from './DropdownMenu';

import './Header.scss'

const Header = ({children}) => {
	return (
		<header className="page__header">
			<Navigation/>
			<DropdownMenu/>
		</header>
	);
};

export default Header;