import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const OnlineEventEdit = ({className, children, viewModel, onSave = null, onUpdate = null}) => {
  const [onlineEventForm, setOnlineEventForm] = useState({
    txtTitle: '',
    txtDescription: '',
		txtTags:'',
		txtPicture:'',
		txtDuration:'',
		dateDate:'',
		txtLink: '',
		ddlUser:'',
  });

  useEffect(() => {
    if (viewModel && viewModel.onlineEvent) {
      setOnlineEventForm({
        txtTitle: viewModel.onlineEvent.title,
        txtDescription: viewModel.onlineEvent.description,
				txtTags: viewModel.onlineEvent.tags,
				txtPicture: viewModel.onlineEvent.picture,
				txtDuration: viewModel.onlineEvent.duration,
				txtPrice: viewModel.onlineEvent.price,
				dateDate: viewModel.onlineEvent.date,
				txtLink: viewModel.onlineEvent.link,
				ddlUser: viewModel.onlineEvent._userId,
      });
    }
  }, [viewModel])

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const onlineEvent = {
      title: onlineEventForm.txtTitle,
      description: onlineEventForm.txtDescription,
			tags: onlineEventForm.txtTags,
			picture: onlineEventForm.txtPicture,
			duration: onlineEventForm.txtDuration,
			price: onlineEventForm.txtPrice,
			date: onlineEventForm.dateDate,
			link: onlineEventForm.txtLink,
			_userId: onlineEventForm.ddlUser,
    };

    if (viewModel.onlineEvent) {
      onUpdate({
        ...onlineEvent,
        _id: viewModel.onlineEvent._id
      });      
    } else {
      onSave(onlineEvent);
    }
  }

  const handleInputChange = (ev) => {
    setOnlineEventForm({
      ...onlineEventForm,
      [ev.target.name]: ev.target.value
    });
  }

  const handleSelectChange = (ev) => {
    setOnlineEventForm({
      ...onlineEventForm,
      [ev.target.name]: ev.target.options[ev.target.selectedIndex].value
    });
  }
  
  return (
    <div className={classnames(className)}>
			  <div className="card shadow mb-4">
							<div className="card-header py-3">
								<h6 className="m-0 font-weight-bold text-primary">{!!viewModel && !!viewModel.onlineEvent ? <Fragment>Update the onlineEvent: {viewModel.onlineEvent.title}</Fragment> : <Fragment>Create a new onlineEvent</Fragment>}</h6>
							</div>
       		 	<div className="card-body">
										<form onSubmit={handleSubmit}>
											<div className="form-group">
												<label htmlFor="txtTitle">Title</label>
												<input type="text" className="form-control" id="txtTitle" name="txtTitle" rows="1" required value={onlineEventForm['txtTitle']} onChange={handleInputChange}/>
											</div>
											<div className="form-group">
												<label htmlFor="txtDescription">Description</label>
												<textarea className="form-control" id="txtDescription" name="txtDescription" rows="10" required value={onlineEventForm['txtDescription']} onChange={handleInputChange} />
											</div>
											<div className="form-group">
												<label htmlFor="txtTags">Tags</label>
												<textarea className="form-control" id="txtTags" name="txtTags" rows="2" required value={onlineEventForm['txtTags']} onChange={handleInputChange} />
											</div>            
											<div className="form-group">
												<label htmlFor="txtPicture">Picture</label>
												<textarea className="form-control" id="txtPicture" name="txtPicture" rows="1" required value={onlineEventForm['txtPicture']} onChange={handleInputChange} />
											</div>           
											<div className="form-group">
												<label htmlFor="txtDuration">Duration</label>
												<textarea className="form-control" id="txtDuration" name="txtDuration" rows="1" required value={onlineEventForm['txtDuration']} onChange={handleInputChange} />
											</div>            
											<div className="form-group">
												<label htmlFor="dateDate">Date</label>
												<textarea className="form-control" id="dateDate" name="dateDate" rows="1" required value={onlineEventForm['dateDate']} onChange={handleInputChange} />
											</div>
											<div className="form-group">
												<label htmlFor="txtLink">Link</label>
												<textarea className="form-control" id="txtLink" name="txtLink" rows="1" required value={onlineEventForm['txtLink']} onChange={handleInputChange} />
											</div>  


											<div className="form-group">
												<label htmlFor="ddlUser">User</label>
												<select className="form-control" id="ddlUser" name="ddlUser" onChange={handleSelectChange} value={onlineEventForm['ddlUser']}>
													{viewModel && viewModel.users && viewModel.users.map((user) => (
														<option key={user._id} value={user._id}>{user.name}</option>
													))}
												</select>
											</div>



					
											<button type="submit"  className="btn btn-primary">{!!viewModel && !!viewModel.onlineEvent ? 'Update' : 'Save'} onlineEvent</button>
										</form>          

						</div>
				</div>
    </div>
  );
};

OnlineEventEdit.prototypes = {
  className: PropTypes.string,
  viewModel: PropTypes.object
};

export default OnlineEventEdit;