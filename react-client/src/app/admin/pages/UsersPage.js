import { default as React } from 'react';

import { Link ,useHistory } from 'react-router-dom';

import * as Routes from '../../routes';
import { UserList } from '../components/users';

const UsersPage = ({children}) => {
	let history = useHistory();

  const handleEdit = (userId) => {
    history.push(Routes.BACKOFFICE_USERS_EDIT.replace(':id', userId));
  };

	return(
		<div className="container">
			<div className='row'>
				<div className="col-12">
					<Link className="btn btn-primary" to={Routes.BACKOFFICE_USERS_CREATE}>Create User</Link> 
				</div>
				<UserList className="col-12 col-sm-12 col-md-12 col-lg-12 ol-xl-6 post-list" limit={10} skip={1} onEdit={handleEdit}  />

			</div>
			

		</div>
	);
}

export default UsersPage;