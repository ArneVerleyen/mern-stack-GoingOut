import { default as React, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import * as Routes from '../routes';

import { PostList } from '../components';

const PostPage = ({children}) => {
	const history = useHistory();
	const handlePostReadMore = (postId) => {
		history.push(`${Routes.POST_DETAIL.replace(':id',postId)}`);
	};

	return (
	<div className="post-list">
		<PostList onReadMore={handlePostReadMore} />
	</div>
	);
};

export default PostPage;