import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const UserEdit = ({className, children, viewModel, onSave = null, onUpdate = null}) => {
  const [userForm, setUserForm] = useState({
    txtTitle: '',
    txtDescription: '',
		txtLocation: '',
		txtCity:'',
		txtStreet:'',
		txtHouseNumber:'',
		txtTags:'',
		txtPicture:'',
		txtDuration:'',
		txtPrice:'',
		dateDate:'',
		ddlCategory: '',
		ddlUser:'',
		ddlVenue:'',
  });

  useEffect(() => {
    if (viewModel && viewModel.user) {
      setUserForm({
        txtTitle: viewModel.user.title,
        txtDescription: viewModel.user.description,
				txtLocation: viewModel.user.location,
				txtCity: viewModel.user.city,
				txtStreet: viewModel.user.street,
				txtHouseNumber: viewModel.user.houseNumber,
				txtTags: viewModel.user.tags,
				txtPicture: viewModel.user.picture,
				txtDuration: viewModel.user.duration,
				txtPrice: viewModel.user.price,
				dateDate: viewModel.user.date,
				ddlCategory: viewModel.user._categoryId,
				ddlUser: viewModel.user._userId,
				ddlVenue: viewModel.user._venueId,
      });
    }
  }, [viewModel])

  const handleSubmit = (ev) => {
    ev.pruserDefault();

    const user = {
      title: userForm.txtTitle,
      description: userForm.txtDescription,
			location: userForm.txtLocation,
			city: userForm.txtCity,
			street: userForm.txtStreet,
			houseNumber: userForm.txtHouseNumber,
			tags: userForm.txtTags,
			picture: userForm.txtPicture,
			duration: userForm.txtDuration,
			price: userForm.txtPrice,
			date: userForm.dateDate,
			_categoryId: userForm.ddlCategory,
			_userId: userForm.ddlUser,
			_venueId: userForm.ddlVenue,
      
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
              <label htmlFor="txtTitle">Title</label>
              <input type="text" className="form-control" id="txtTitle" name="txtTitle" required value={userForm['txtTitle']} onChange={handleInputChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="txtDescription">Description</label>
              <textarea className="form-control" id="txtDescription" name="txtDescription" rows="10" required value={userForm['txtDescription']} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="txtLocation">Location</label>
              <textarea className="form-control" id="txtLocation" name="txtLocation" rows="3" required value={userForm['txtLocation']} onChange={handleInputChange} />
            </div>
						<div className="form-group">
              <label htmlFor="txtCity">City</label>
              <textarea className="form-control" id="txtCity" name="txtCity" rows="3" required value={userForm['txtCity']} onChange={handleInputChange} />
            </div>
						<div className="form-group">
              <label htmlFor="txtStreet">Street</label>
              <textarea className="form-control" id="txtStreet" name="txtStreet" rows="3" required value={userForm['txtStreet']} onChange={handleInputChange} />
            </div>
						<div className="form-group">
              <label htmlFor="txtHouseNumber">HouseNumber</label>
              <textarea className="form-control" id="txtHouseNumber" name="txtHouseNumber" rows="3" required value={userForm['txtHouseNumber']} onChange={handleInputChange} />
            </div>
						<div className="form-group">
              <label htmlFor="txtTags">Tags</label>
              <textarea className="form-control" id="txtTags" name="txtTags" rows="3" required value={userForm['txtTags']} onChange={handleInputChange} />
            </div>            <div className="form-group">
              <label htmlFor="txtPicture">Picture</label>
              <textarea className="form-control" id="txtPicture" name="txtPicture" rows="3" required value={userForm['txtPicture']} onChange={handleInputChange} />
            </div>            <div className="form-group">
              <label htmlFor="txtDuration">Duration</label>
              <textarea className="form-control" id="txtDuration" name="txtDuration" rows="3" required value={userForm['txtDuration']} onChange={handleInputChange} />
            </div>            <div className="form-group">
              <label htmlFor="txtPrice">Price</label>
              <textarea className="form-control" id="txtPrice" name="txtPrice" rows="3" required value={userForm['txtPrice']} onChange={handleInputChange} />
            </div>            <div className="form-group">
              <label htmlFor="dateDate">Date</label>
              <textarea className="form-control" id="dateDate" name="dateDate" rows="3" required value={userForm['dateDate']} onChange={handleInputChange} />
            </div>

            <div className="form-group">
              <label htmlFor="ddlCategory">Category</label>
              <select className="form-control" id="ddlCategory" name="ddlCategory" onChange={handleSelectChange} value={userForm['ddlCategory']}>
                {viewModel && viewModel.categories && viewModel.categories.map((category) => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
            </div>

						<div className="form-group">
              <label htmlFor="ddlUser">User</label>
              <select className="form-control" id="ddlUser" name="ddlUser" onChange={handleSelectChange} value={userForm['ddlUser']}>
                {viewModel && viewModel.users && viewModel.users.map((user) => (
                  <option key={user._id} value={user._id}>{user.name}</option>
                ))}
              </select>
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