import React, { Component } from 'react';
import Helmet from 'react-helmet';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';
import PostListing from '../components/Post/PostListing';
import WordPressAcfTextBlock from '../components/Layout/Flexible-Content/WordPressAcfTextBlock';
import WordPressAcfWysiwyg from '../components/Layout/Flexible-Content/WordPressAcfWysiwyg';
import WordPressAcfMap from '../components/Layout/Flexible-Content/WordPressAcfMap';

export default class Index extends Component {
	render() {
		console.log(this);

		// const page = this.props.data.wordpressPage;
		return (
			<div>
				<Helmet title={config.siteTitle} />

				<div className="content__inner">
					<h1>Home page being rendered</h1>
					{page.acf !== null && page.acf.flexible_content_page !== null ?
						page.acf.flexible_content_page.map((item) => {
							switch (item.__typename) {
							case 'WordPressAcf_blog_posts':
								return <PostListing postEdges={this.props.data.allWordpressPost.edges} key={item.id} />;

							case 'WordPressAcf_text_block':
								return <WordPressAcfTextBlock item={item} key={item.id} />;

							case 'WordPressAcf_wysiwyg':
								return <WordPressAcfWysiwyg item={item} key={item.id} />;

							case 'WordPressAcf_map':
								return <WordPressAcfMap item={item} key={item.id} />;

							case 'WordPressAcf_seo':
								return <SEO postPath={page.slug} post={item} postSEO key={item.id} />;

							default:
								return null;
							}
						})
						: ''}
				</div>
			</div>
		);
	}
}

/* eslint no-undef: "off" */
// export const indexPageQuery = graphql`
//   query IndexQuery($id: String!) {
// 		wordpressPage(id: { eq: $id }) {
// 			id
// 			slug
// 			title
// 			featured_media {
// 				localFile {
// 					childImageSharp {
// 						sizes(maxWidth: 600) {
// 							...GatsbyImageSharpSizes
// 						}
// 					}
// 				}
// 			}
// 			acf {
// 				flexible_content_page {
// 					__typename
//           ... on WordPressAcf_blog_posts {
//             id
//           }
// 					... on WordPressAcf_wysiwyg {
// 						editor
// 					}
// 					... on WordPressAcf_seo {
// 						seo_title
// 					}
// 					... on WordPressAcf_map {
// 						map {
// 							address
// 							lat
// 							lng
// 						}
// 					}
// 				}
// 			}
// 		}
// 	}
// `;
