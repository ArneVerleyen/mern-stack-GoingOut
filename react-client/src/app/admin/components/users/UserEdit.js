import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const UserEdit = ({className, children, viewModel, onSave = null, onUpdate = null}) => {
  const [userForm, setUserForm] = useState({
    txtEmail: '',
    txtRole: '',
		txtPassword: '',
		txtFirstName:'',
		txtLastName:'',
		txtAvatar:'',
  });

  useEffect(() => {
    if (viewModel && viewModel.user) {
      setUserForm({
        txtEmail: viewModel.user.email,
        txtRole: viewModel.user.role,
				txtPassword: viewModel.user.loacalProvider.password,
				txtFirstName: viewModel.user.profile.firstName,
				txtLastName: viewModel.user.profile.lastName,
				txtAvatar: viewModel.user.profile.avatar,
      });
    }
  }, [viewModel])

  const handleSubmit = (ev) => {
    ev.pruserDefault();

    const user = {
			email: userForm.txtEmail,
			role: userForm.txtRole,
			password: userForm.txtPassword,
			firstName: userForm.txtFirstName,
			lastName: userForm.txtLastName,
			txtAvatar: userForm.txtAvatar,
    };

    if (viewModel.user) {
      onUpdate({
        ...user,
        _id: viewModel.user._id
      });      
    } else {
      onSave(user);
    }
  }

  const handleInputChange = (ev) => {
    setUserForm({
      ...userForm,
      [ev.target.name]: ev.target.value
    });
  }

  const handleSelectChange = (ev) => {
    setUserForm({
      ...userForm,
      [ev.target.name]: ev.target.options[ev.target.selectedIndex].value
    });
  }
  
  return (
    <div className={classnames(className)}>
			      <div className="card shadow mb-4">
        <div className="card-header py-3">
  				<h6 className="m-0 font-weight-bold text-primary">{!!viewModel && !!viewModel.user ? <Fragment>Update the user: {viewModel.user.title}</Fragment> : <Fragment>Create a new user</Fragment>}</h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="txtEmail">E-mail</label>
              <input type="text" className="form-control" id="txtEmail" name="txtEmail" rows="1" required value={userForm['txtEmail']} onChange={handleInputChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="txtRole">Role</label>
              <textarea className="form-control" id="txtRole" name="txtRole" rows="1" required value={userForm['txtRole']} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="txtPassword">Password</label>
              <textarea className="form-control" id="txtPassword" name="txtPassword" rows="1" required value={userForm['txtPassword']} onChange={handleInputChange} />
            </div>
						<div className="form-group">
              <label htmlFor="txtFirstName">First name</label>
              <textarea className="form-control" id="txtFirstName" name="txtFirstName" rows="1" required value={userForm['txtFirstName']} onChange={handleInputChange} />
            </div>
						<div className="form-group">
              <label htmlFor="txtLastName">Last name</label>
              <textarea className="form-control" id="txtLastName" name="txtLastName" rows="1" required value={userForm['txtLastName']} onChange={handleInputChange} />
            </div>
						<div className="form-group">
              <label htmlFor="txtAvatar">Avatar</label>
              <textarea className="form-control" id="txtAvatar" name="txtAvatar" rows="1" required value={userForm['txtAvatar']} onChange={handleInputChange} />
            </div>
            <button type="submit"  className="btn btn-primary">{!!viewModel && !!viewModel.user ? 'Update' : 'Save'} user</button>
          </form>          
        </div>
      </div>
    </div>
  );
};

UserEdit.prototypes = {
  className: PropTypes.string,
  viewModel: PropTypes.object
};

export default UserEdit;