import React, { Component } from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import Helmet from 'react-helmet';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';
import SocialLinks from '../components/SocialLinks/SocialLinks';
import PostListing from '../components/Post/PostListing';
import WordPressAcfTextBlock from '../components/Layout/Flexible-Content/WordPressAcfTextBlock';
import WordPressAcfWysiwyg from '../components/Layout/Flexible-Content/WordPressAcfWysiwyg';
import WordPressAcfMap from '../components/Layout/Flexible-Content/WordPressAcfMap';

export default class Page extends Component {
	render() {
		const page = this.props.data.wordpressPage;
		const { slug } = this.props.data.wordpressPage.slug;
		const pageNode = this.props.data.wordpressPage;

		return (
			<div>
				<Helmet>
					<title>{`${page.title} | ${config.siteTitle}`}</title>
				</Helmet>
				<div>
					<h1
						className="alpha"
						dangerouslySetInnerHTML={{
							__html: page.title,
						}}
					/>
					{page.featured_media !== null ?
						<Img
							sizes={page.featured_media.localFile.childImageSharp.sizes}
							alt={page.featured_media.alt_text}
							style={{
								position: 'relative',
								left: 0,
								top: 0,
								width: '100%',
								height: '100%',
							}}
						/> : ''
					}
					<div dangerouslySetInnerHTML={{
						__html: page.content,
					}}
					/>
					{page.acf !== null && page.acf.flexible_content_page !== null ?
						page.acf.flexible_content_page.map((item) => {
							switch (item.__typename) {
							case 'WordPressAcf_blog_posts':
								return <PostListing postEdges={this.props.data.allWordpressPost.edges} />;

							case 'WordPressAcf_text_block':
								return <WordPressAcfTextBlock item={item} key={item.id} />;

							case 'WordPressAcf_wysiwyg':
								return <WordPressAcfWysiwyg item={item} key={item.id} />;

							case 'WordPressAcf_map':
								return <WordPressAcfMap item={item} />;

							case 'WordPressAcf_seo':
								return <SEO postPath={page.slug} postNode={item} postSEO />;

							default:
								return null;
							}
						})
						: ''}
					<div className="post-meta">
						<SocialLinks postPath={slug} postNode={pageNode} />
					</div>
				</div>
			</div>
		);
	}
}

export const pageQuery = graphql`
	query currentPageQuery($id: String!) {
		wordpressPage(id: { eq: $id }) {
			title
			content
			slug
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
			acf {
				flexible_content_page {
					__typename
          ... on WordPressAcf_blog_posts {
            id
          }
					... on WordPressAcf_wysiwyg {
						editor
					}
					... on WordPressAcf_seo {
						seo_title
						seo_keywords
						seo_description
						seo_image {
							localFile {
								childImageSharp {
									sizes(maxWidth: 1280) {
										...GatsbyImageSharpSizes
									}
								}
							}
						}
					}
					... on WordPressAcf_map {
						map {
							address
							lat
							lng
						}
					}
				}
			}
		}
		allWordpressPost {
			edges {
				node {
					id
					slug
					status
					format
					title
					author {
						name
						avatar_urls {
							wordpress_96
						}
					}
					featured_media {
						localFile {
							childImageSharp {
								sizes(maxWidth: 600) {
									...GatsbyImageSharpSizes
								}
							}
						}
						alt_text
        	}
				}
			}
		}
	}
`;
