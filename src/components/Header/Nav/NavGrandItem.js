import Link from 'gatsby-link';
import React, { Component } from 'react';
import NavDropdown from './NavDropdown';
import PropType from 'prop-types';

class NavGrandItem extends Component {
	render() {
		const navItem = this.props.item;
		return (
			<li className="header-nav__item--grand" key={navItem.id}>
				<Link to={navItem.object_slug} className="header-nav__link">
					{navItem.title}
				</Link>
			</li>
		);
	}
}


NavGrandItem.propType = {
	item: PropType.shape({
		title: PropType.string,
	}).isRequired,
};


export default NavGrandItem;
