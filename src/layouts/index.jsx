import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import config from '../../data/SiteConfig';
import '../styles/main.scss';


export default class MainLayout extends React.Component {
	getLocalTitle() {
		function capitalize(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
		const pathPrefix = config.pathPrefix ? config.pathPrefix : '/';
		const currentPath = this.props.location.pathname
			.replace(pathPrefix, '')
			.replace('/', '');
		let title = '';
		if (currentPath === '') {
			title = 'Home';
		} else if (currentPath === 'tags/') {
			title = 'Tags';
		} else if (currentPath === 'categories/') {
			title = 'Categories';
		} else if (currentPath === 'about/') {
			title = 'About';
		} else if (currentPath.indexOf('posts')) {
			title = 'Article';
		} else if (currentPath.indexOf('tags/')) {
			const tag = currentPath
				.replace('tags/', '')
				.replace('/', '')
				.replace('-', ' ');
			title = `Tagged in ${capitalize(tag)}`;
		} else if (currentPath.indexOf('categories/')) {
			const category = currentPath
				.replace('categories/', '')
				.replace('/', '')
				.replace('-', ' ');

			title = `${capitalize(category)}`;
		}
		return title;
	}
	render() {
		const { children } = this.props;
		return (
			<div>
				<Helmet>
					<title>{`${config.siteTitle} |  ${this.getLocalTitle()}`}</title>
					<meta name="description" content={config.siteDescription} />
				</Helmet>
				<Header pages={this.props.data.wordpressWpApiMenusMenusItems.items} />
				<div className="content__wrapper">
					{children()}
				</div>
				<Footer />
			</div>
		);
	}
}

export const query = graphql`
	query MenuQuery {
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

