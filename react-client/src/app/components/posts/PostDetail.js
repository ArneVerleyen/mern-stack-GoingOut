import { default as React, Fragment } from 'react';

const PostDetail = ({ post }) => {
	return (
		<Fragment>
			{!!post
				? <Fragment>
						<article className="post--deatail">
							<h1 className="post__title">{post.title}</h1>
							<p className="post__synopsis">{post.synopsis}</p>
							<p className="post__body" dangerouslySetInnerHTML={{
								__html: post.body
							}}></p> 
						</article>	
					</Fragment>
				: <Fragment></Fragment>
			}
	</Fragment>
	);
};

export default PostDetail;