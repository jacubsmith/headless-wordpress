import React from 'react';
import Helmet from 'react-helmet';
import SEO from '../components/SEO/SEO';
// import PostListing from '../components/Posts/PostListing/PostListing'
import config from '../../data/SiteConfig';

class Index extends React.Component {
	render() {
		const postEdges = this.props.data.allWordpressPost.edges;
		return (
			<div>
				<Helmet title={config.siteTitle} />
				<SEO postEdges={postEdges} />

				<div className="content__inner">
					<h1>Gatsby + Wordpress Blog</h1>
				</div>
			</div>
		);
	}
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allWordpressPost {
			edges {
				node {
					id
					slug
					status
					format
					title
					featured_media {
						localFile {
							childImageSharp {
								sizes(maxWidth: 600) {
									...GatsbyImageSharpSizes
								}
							}
						}
        	}
				}
			}
		}
		allWordpressPage {
      edges {
        node {
          slug
          title
          id
        }
      }
    }
		wordpressWpApiMenusMenusItems {
			name
			items {
				wordpress_id
				order
				title
				url
				object_slug
				wordpress_children {
					wordpress_id
					order
					title
					url
					object_slug
				}
			}
		}
	}
`;
