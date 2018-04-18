import React, { Component } from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';


class PostListing extends Component {
	getPostList() {
		const postList = [];
		this.props.postEdges.forEach((postEdge) => {
			postList.push({
				id: postEdge.node.id,
				path: postEdge.node.slug,
				cover: postEdge.node.cover,
				title: postEdge.node.title,
				excerpt: postEdge.node.excerpt,
				featuredImage:
          postEdge.node.featured_media !== null
          	? postEdge.node.featured_media.localFile
          	: '',
				featuredImageAlt:
					postEdge.node.featured_media !== null
						? postEdge.node.featured_media.alt_text
						: '',
				authorName: postEdge.node.author.name,
				authorAvatarUrl: postEdge.node.author.avatar_urls.wordpress_96,
			});
		});
		return postList;
	}


	render() {
		const postList = this.getPostList();
		return (
			<div className="blog-listings">
				{
					postList.map(post => (
						<Link to={post.path} className="blog-listings__listing" key={post.id}>
							{post.featuredImage !== '' ?
								<Img
									className="blog-listings__image"
									sizes={post.featuredImage.childImageSharp.sizes}
									alt={post.featuredImageAlt}
									style={{
										position: 'relative',
										maxWidth: '100%',
										height: 'auto',
									}}
								/> : ''
							}
							<div className="blog-listings__content-wrapper">
								<p className="blog-listings__content">{post.title}</p>
							</div>
						</Link>
					))
				}
			</div>
		);
	}
}

export default PostListing;

