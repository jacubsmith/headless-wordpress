import Link from 'gatsby-link';
import React, { Component } from 'react';
import NavDropdown from './NavDropdown';
import PropType from 'prop-types';

class NavItem extends Component {
	render() {
		const navItem = this.props.item;

		return (
			<li className="header-nav__item" key={navItem.id}>
				<Link to={navItem.object_slug} className="header-nav__link">
					{navItem.title}
				</Link>
			</li>
		);
	}
}


NavItem.propType = {
	item: PropType.shape({
		title: PropType.string,
	}).isRequired,
};


export default NavItem;

// {navItem.wordpress_children !== null ?
// 	<NavDropdown data={navItem.wordpress_children} key={navItem.wordpress_id} />
// 	: ''
// }
