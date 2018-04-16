import React from 'react';
import Helmet from 'react-helmet';
import PostTags from '../components/Post/PostTag';
import SocialLinks from '../components/SocialLinks/SocialLinks';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';

export default class PostTemplate extends React.Component {
	render() {
		const { slug } = this.props.data.wordpressPost.slug;
		const postNode = this.props.data.wordpressPost;
		const post = this.props.data.wordpressPost;

		if (!post.id) {
			post.id = slug;
		}
		if (!post.category_id) {
			post.category_id = config.postDefaultCategoryID;
		}

		return (
			<div>
				<Helmet>
					<title>{`${post.title} | ${config.siteTitle}`}</title>
				</Helmet>
				<SEO postPath={slug} postNode={postNode} postSEO />
				<div>
					<h1>{post.title}</h1>
					<div dangerouslySetInnerHTML={{ __html: postNode.content }} />
					<div className="post-meta">
						{post.tags !== null ? <PostTags tags={post.tags} /> : ''}
						<SocialLinks postPath={slug} postNode={postNode} />
					</div>
				</div>
			</div>
		);
	}
}

/* eslint no-undef: "off" */
export const postQuery = graphql`
  query currentpostQuery($id: String!) {
    wordpressPost(id: { eq: $id }) {
 			title
 			content
 			slug
			tags {
				name
			}
		}
  }
`;
