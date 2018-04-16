import Link from 'gatsby-link';
import React, { Component } from 'react';
import NavItem from './Nav/NavItem';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isToggled: false,
		};

		this.toggleMenu = this.toggleMenu.bind(this);
	}

	toggleMenu() {
		this.setState(prevState => ({
			isToggled: !prevState.isToggled,
		}));
	}

	render() {
		return (
			<header className="header">
				<div className={
					this.state.isToggled ? 'header__inner' : 'header__inner open'
				}
				>
					<Link to="/" className="header__title">
						<h3 className="gamma">Site Title</h3>
					</Link>
					<nav className="header-nav">
						<ul className="header-nav__items" onClick={this.toggleMenu}>
							{this.props.pages.map(item =>
								<NavItem key={item.wordpress_id} item={item} />,
							)}
						</ul>
					</nav>
					<div className="pancake" onClick={this.toggleMenu}>
						<div className="pancake__line" />
					</div>
				</div>
			</header>
		);
	}
}


export default Header;

