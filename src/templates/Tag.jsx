import React from 'react';
import Helmet from 'react-helmet';
import config from '../../data/SiteConfig';
import styled from 'styled-components';
import PostListing from '../components/Post/PostListing';

export default class TagTemplate extends React.Component {
	render() {
		const tag = this.props.pathContext.id;
		const postEdges = this.props.data.allWordpressPost.edges;

		return (
			<div className="tag-container">
				<Helmet title={`Posts tagged as "${tag}" | ${config.siteTitle}`} />
				<MainContentContainer>
					<h1>Posts with Tag: {tag}</h1>
					<div>
						<PostListing postEdges={postEdges} />
					</div>
				</MainContentContainer>
			</div>
		);
	}
}

const MainContentContainer = styled.main`
  width: 600px;
  margin: 50px auto;

  h1 {
    text-align: center;
    font-weight: 700;
    margin-bottom: 25px;
  }

  p {
    font-size: 16px;
    margin-bottom: 25px;
  }

  pre {
    background-color: grey;
  }
`;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage {
    allWordpressPost {
      edges {
        node {
          featured_media {
            localFile {
              childImageSharp {
                sizes(maxWidth: 1280) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            alt_text
          }
          date
          slug
          title
          modified
          excerpt 
          id
          tags {
            name
          }
          author {
            name
            avatar_urls {
              wordpress_96
            }
          }
          content
        }
      }
    }
  }
`;
