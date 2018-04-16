import React, { Component } from 'react';
import Link from 'gatsby-link';
import PropType from 'prop-types';
import NavGrandItem from './NavGrandItem';

class NavDropdown extends Component {
	render() {
		return (
			<ul className="header-nav__items--grand" />
		);
	}
}

NavDropdown.propType = {
	item: PropType.shape({
		title: PropType.string,
	}).isRequired,
};

export default NavDropdown;
