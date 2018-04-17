import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';
import config from '../../../data/SiteConfig';

class GoogleMapContainer extends Component {
	// getCenter() {
	// 	const { lat, lng } = this.props.page.acf.maps;
	// 	return {
	// 		lat,
	// 		lng,
	// 	};
	// }

	render() {
		const mapStyles = {
			position: 'relative',
			width: '100%',
			height: '50vh',
		};
		if (!this.props.loaded) {
			return <div>Loading...</div>;
		}

		const { lat, lng } = this.props.initialCenter;

		return (
			<div style={mapStyles}>
				<Map
					google={this.props.google}
					zoom={14}
					center={{
						lat,
						lng,
					}}
					initialCenter={{
						lat,
						lng,
					}}
				>
					<Marker
						onClick={this.onMarkerClick}
						name="Current location"
					/>
				</Map>
			</div>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: config.googleMapsAPI,
})(GoogleMapContainer);
