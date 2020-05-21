import { default as React } from 'react';
import { Link, NavLink } from 'react-router-dom';

import * as Routes from '../../routes';

import './Footer.scss';

import instagramLogo from '../../_static/images/instagram-square-brands.svg';
import facebookLogo from '../../_static/images/facebook-square-brands.svg';
import twitterLogo from '../../_static/images/twitter-square-brands.svg';
import LogoFooter from '../../_static/images/GoingOutFooter.svg';

const Footer = ({children}) => {
	return (
		<header className="page__footer">
			<Link className="logo-footer" to={Routes.LANDING}>
				<img src={LogoFooter}></img>
			</Link>

			<ul to={Routes.CONTACT} className="footer-contact">
				<h3>Contact:</h3>
				<li>
					<img src={facebookLogo}></img>
					<p>Facebook</p>
				</li>
				<li>
					<img src={twitterLogo}></img>
					<p>Twitter</p>
				</li>
				<li>
					<img src={instagramLogo}></img>
					<p>Instagram</p>
				</li>
			</ul>
		</header>
	);
};

export default Footer;