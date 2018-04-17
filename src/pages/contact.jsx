import React, { Component } from 'react';
import Helmet from 'react-helmet';
import GoogleMapContainer from '../components/Map/GoogleMapContainer';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';

class contact extends Component {
	render() {
		const { address } = this.props.data.wordpressPage.acf.maps;
		const { content } = this.props.data.wordpressPage;

		return (
			<div>
				<Helmet title={config.siteTitle} />
				<div className="content__inner">
					<GoogleMapContainer initialCenter={this.props.data.wordpressPage.acf.maps} />
					{ address }
					<div
						className="editor"
						dangerouslySetInnerHTML={{
							__html: content,
						}}
					/>
				</div>
			</div>
		);
	}
}

export default contact;

export const contactQuery = graphql`
	query contactPage($id: String) {
		wordpressPage(id: { eq: $id}) {
			title
			content
			featured_media {
				localFile {
					childImageSharp {
						sizes(maxWidth: 1280) {
							...GatsbyImageSharpSizes
						}
					}
				}
			}
			acf {
				maps {
					address
					lat
					lng
				}
			}
		}
	}
`;
