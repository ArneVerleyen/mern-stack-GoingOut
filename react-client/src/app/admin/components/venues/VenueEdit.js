import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const VenueEdit = ({className, children, viewModel, onSave = null, onUpdate = null}) => {
  const [venueForm, setVenueForm] = useState({
    txtName: '',
    txtDescription: '',
		txtLocation: '',
		txtCity:'',
		txtStreet:'',
		txtHouseNumber:'',
		txtPicture:'',
  });

  useEffect(() => {
    if (viewModel && viewModel.venue) {
      setVenueForm({
        txtName: viewModel.venue.name,
        txtDescription: viewModel.venue.description,
				txtLocation: viewModel.venue.location,
				txtCity: viewModel.venue.city,
				txtStreet: viewModel.venue.street,
				txtHouseNumber: viewModel.venue.houseNumber,
				txtPicture: viewModel.venue.picture,
      });
    }
  }, [viewModel])

  const handleSubmit = (ev) => {
    ev.prvenueDefault();

    const venue = {
      name: venueForm.txtName,
      description: venueForm.txtDescription,
			location: venueForm.txtLocation,
			city: venueForm.txtCity,
			street: venueForm.txtStreet,
			houseNumber: venueForm.txtHouseNumber,
			picture: venueForm.txtPicture,
      
    };

    if (viewModel.venue) {
      onUpdate({
        ...venue,
        _id: viewModel.venue._id
      });      
    } else {
      onSave(venue);
    }
  }

  const handleInputChange = (ev) => {
    setVenueForm({
      ...venueForm,
      [ev.target.name]: ev.target.value
    });
  }

  const handleSelectChange = (ev) => {
    setVenueForm({
      ...venueForm,
      [ev.target.name]: ev.target.options[ev.target.selectedIndex].value
    });
  }
  
  return (
    <div className={classnames(className)}>
			      <div className="card shadow mb-4">
        <div className="card-header py-3">
  				<h6 className="m-0 font-weight-bold text-primary">{!!viewModel && !!viewModel.venue ? <Fragment>Update the venue: {viewModel.venue.name}</Fragment> : <Fragment>Create a new venue</Fragment>}</h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="txtTitle">Name</label>
              <input type="text" className="form-control" id="txtName" name="txtName" required value={venueForm['txtName']} onChange={handleInputChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="txtDescription">Description</label>
              <textarea className="form-control" id="txtDescription" name="txtDescription" rows="10" required value={venueForm['txtDescription']} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="txtLocation">Location</label>
              <textarea className="form-control" id="txtLocation" name="txtLocation" rows="3" required value={venueForm['txtLocation']} onChange={handleInputChange} />
            </div>
						<div className="form-group">
              <label htmlFor="txtCity">City</label>
              <textarea className="form-control" id="txtCity" name="txtCity" rows="3" required value={venueForm['txtCity']} onChange={handleInputChange} />
            </div>
						<div className="form-group">
              <label htmlFor="txtStreet">Street</label>
              <textarea className="form-control" id="txtStreet" name="txtStreet" rows="3" required value={venueForm['txtStreet']} onChange={handleInputChange} />
            </div>
						<div className="form-group">
              <label htmlFor="txtHouseNumber">HouseNumber</label>
              <textarea className="form-control" id="txtHouseNumber" name="txtHouseNumber" rows="3" required value={venueForm['txtHouseNumber']} onChange={handleInputChange} />
            </div>
					
          	<div className="form-group">
              <label htmlFor="txtPicture">Picture</label>
              <textarea className="form-control" id="txtPicture" name="txtPicture" rows="3" required value={venueForm['txtPicture']} onChange={handleInputChange} />
            </div>            



 
            <button type="submit"  className="btn btn-primary">{!!viewModel && !!viewModel.venue ? 'Update' : 'Save'} venue</button>
          </form>          
        </div>
      </div>
    </div>
  );
};

VenueEdit.prototypes = {
  className: PropTypes.string,
  viewModel: PropTypes.object
};

export default VenueEdit;