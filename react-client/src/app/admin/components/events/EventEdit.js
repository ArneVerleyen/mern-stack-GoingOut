import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const EventEdit = ({className, children, viewModel, onSave = null, onUpdate = null}) => {
  const [eventForm, setEventForm] = useState({
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
    if (viewModel && viewModel.event) {
      setEventForm({
        txtTitle: viewModel.event.title,
        txtDescription: viewModel.event.description,
				txtLocation: viewModel.event.location,
				txtCity: viewModel.event.city,
				txtStreet: viewModel.event.street,
				txtHouseNumber: viewModel.event.houseNumber,
				txtTags: viewModel.event.tags,
				txtPicture: viewModel.event.picture,
				txtDuration: viewModel.event.duration,
				txtPrice: viewModel.event.price,
				dateDate: viewModel.event.date,
				ddlCategory: viewModel.event._categoryId,
				ddlUser: viewModel.event._userId,
				ddlVenue: viewModel.event._venueId,
      });
    }
  }, [viewModel])

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const event = {
      title: eventForm.txtTitle,
      description: eventForm.txtDescription,
			location: eventForm.txtLocation,
			city: eventForm.txtCity,
			street: eventForm.txtStreet,
			houseNumber: eventForm.txtHouseNumber,
			tags: eventForm.txtTags,
			picture: eventForm.txtPicture,
			duration: eventForm.txtDuration,
			price: eventForm.txtPrice,
			date: eventForm.dateDate,
			_categoryId: eventForm.ddlCategory,
			_userId: eventForm.ddlUser,
			_venueId: eventForm.ddlVenue,
      
    };

    if (viewModel.event) {
      onUpdate({
        ...event,
        _id: viewModel.event._id
      });      
    } else {
      onSave(event);
    }
  }

  const handleInputChange = (ev) => {
    setEventForm({
      ...eventForm,
      [ev.target.name]: ev.target.value
    });
  }

  const handleSelectChange = (ev) => {
    setEventForm({
      ...eventForm,
      [ev.target.name]: ev.target.options[ev.target.selectedIndex].value
    });
  }
  
  return (
    <div className={classnames(className)}>
			      <div className="card shadow mb-4">
        <div className="card-header py-3">
  				<h6 className="m-0 font-weight-bold text-primary">{!!viewModel && !!viewModel.event ? <Fragment>Update the event: {viewModel.event.title}</Fragment> : <Fragment>Create a new event</Fragment>}</h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="txtTitle">Title</label>
              <input type="text" className="form-control" id="txtTitle" name="txtTitle" required value={eventForm['txtTitle']} onChange={handleInputChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="txtDescription">Description</label>
              <textarea className="form-control" id="txtDescription" name="txtDescription" rows="10" required value={eventForm['txtDescription']} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="txtLocation">Location</label>
              <textarea className="form-control" id="txtLocation" name="txtLocation" rows="3" required value={eventForm['txtLocation']} onChange={handleInputChange} />
            </div>
						<div className="form-group">
              <label htmlFor="txtCity">City</label>
              <textarea className="form-control" id="txtCity" name="txtCity" rows="3" required value={eventForm['txtCity']} onChange={handleInputChange} />
            </div>
						<div className="form-group">
              <label htmlFor="txtStreet">Street</label>
              <textarea className="form-control" id="txtStreet" name="txtStreet" rows="3" required value={eventForm['txtStreet']} onChange={handleInputChange} />
            </div>
						<div className="form-group">
              <label htmlFor="txtHouseNumber">HouseNumber</label>
              <textarea className="form-control" id="txtHouseNumber" name="txtHouseNumber" rows="3" required value={eventForm['txtHouseNumber']} onChange={handleInputChange} />
            </div>
						<div className="form-group">
              <label htmlFor="txtTags">Tags</label>
              <textarea className="form-control" id="txtTags" name="txtTags" rows="3" required value={eventForm['txtTags']} onChange={handleInputChange} />
            </div>            <div className="form-group">
              <label htmlFor="txtPicture">Picture</label>
              <textarea className="form-control" id="txtPicture" name="txtPicture" rows="3" required value={eventForm['txtPicture']} onChange={handleInputChange} />
            </div>            <div className="form-group">
              <label htmlFor="txtDuration">Duration</label>
              <textarea className="form-control" id="txtDuration" name="txtDuration" rows="3" required value={eventForm['txtDuration']} onChange={handleInputChange} />
            </div>            <div className="form-group">
              <label htmlFor="txtPrice">Price</label>
              <textarea className="form-control" id="txtPrice" name="txtPrice" rows="3" required value={eventForm['txtPrice']} onChange={handleInputChange} />
            </div>            <div className="form-group">
              <label htmlFor="dateDate">Date</label>
              <textarea className="form-control" id="dateDate" name="dateDate" rows="3" required value={eventForm['dateDate']} onChange={handleInputChange} />
            </div>

            <div className="form-group">
              <label htmlFor="ddlCategory">Category</label>
              <select className="form-control" id="ddlCategory" name="ddlCategory" onChange={handleSelectChange} value={eventForm['ddlCategory']}>
                {viewModel && viewModel.categories && viewModel.categories.map((category) => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
            </div>

						<div className="form-group">
              <label htmlFor="ddlUser">User</label>
              <select className="form-control" id="ddlUser" name="ddlUser" onChange={handleSelectChange} value={eventForm['ddlUser']}>
                {viewModel && viewModel.users && viewModel.users.map((user) => (
                  <option key={user._id} value={user._id}>{user.name}</option>
                ))}
              </select>
            </div>



 
            <button type="submit"  className="btn btn-primary">{!!viewModel && !!viewModel.event ? 'Update' : 'Save'} event</button>
          </form>          
        </div>
      </div>
    </div>
  );
};

EventEdit.prototypes = {
  className: PropTypes.string,
  viewModel: PropTypes.object
};

export default EventEdit;