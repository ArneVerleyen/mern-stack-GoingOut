import { default as React, useState } from 'react';

import * as Routes from '../routes';
import { useAuth } from '../services';
import { useHistory } from 'react-router-dom';

const SignUpPage = ({children}) => {
  const { signUpLocal } = useAuth();
  const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [avatar, setAvatar] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
  let history = useHistory();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
		const user = await signUpLocal(email, password, avatar, firstName, lastName);
    if (user) {
      history.push(Routes.HOME);
    }
	}

  return (
    <div className="h-100 d-flex flex-column justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign Up</h5>
                <form className="form-signin" onSubmit={(ev) => handleSubmit(ev)}>
                  <div className="form-label-group">
                    <label htmlFor="inputEmail">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus onChange={(ev) => setEmail(ev.target.value)} />
                  </div>
                  <div className="form-label-group">
                    <label htmlFor="inputAvatar">Avatar link</label>
                    <input type="avatar" id="inputAvatar" className="form-control" placeholder="www.avatarimg.be" required onChange={(ev) => setAvatar(ev.target.value)} />                    
                  </div>
									<div className="form-label-group">
                    <label htmlFor="inputPassword">first name</label>
                    <input type="firstName" id="inputfirstName" className="form-control" placeholder="firstName" required onChange={(ev) => setFirstName(ev.target.value)} />                    
                  </div>
									<div className="form-label-group">
                    <label htmlFor="inputLastName">last name</label>
                    <input type="lastName" id="inputLastName" className="form-control" placeholder="Last name" required onChange={(ev) => setLastName(ev.target.value)} />                    
                  </div>
									<div className="form-label-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required onChange={(ev) => setPassword(ev.target.value)} />                    
                  </div>
                  <div className="custom-control custom-checkbox mb-3">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                  </div>
                  <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign Up</button>
                  <hr className="my-4" />
                  <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i className="fab fa-google mr-2"></i> Sign in with Google</button>
                  <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i className="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>
									
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;