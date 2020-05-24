import { default as React } from 'react';

import './contactPage.scss';

import logoFacebook from '../_static/images/contact/facebook-square-brands.svg';
import logoInstagram from '../_static/images/contact/instagram-square-brands.svg';
import logoTwitter from '../_static/images/contact/twitter-square-brands.svg';

const ContactPage = ({children}) => {
	return (
		<div className="contact-container">
			<h1>Contact</h1>
			<h3>Telefoon: 0499 999 999</h3>
			<h3>GSM: 0499 999 999</h3>
			<h3>e-mail: goingout@gmail.com</h3>
			<div className="row">
				<img src={logoFacebook} alt="facebook"></img>
				<p>Facebook</p>
			</div>
			<div className="row">
				<img src={logoInstagram} alt="instagram"></img>
				<p>Instagram</p>
			</div>
			<div className="row">
				<img src={logoTwitter} alt="twitter"></img>
				<p>Twitter</p>
			</div>
		</div>
	);
};

export default ContactPage;