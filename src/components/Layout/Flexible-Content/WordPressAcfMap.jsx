import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import { googleMapsAPI } from '../../../../data/SiteConfig';

class WordPressAcfMap extends Component {
  static defaultProps = {
  	center: { lat: 59.95, lng: 30.33 },
  	zoom: 11,
  }

  render() {
  	const mapStyles = {
  		position: 'relative',
  		width: '100%',
  		height: '50vh',
  	};

  	const { lat, lng } = this.props.item.map;
  	const center = {
  		lat,
  		lng,
  	};

  	return (
  		<GoogleMapReact
  			bootstrapURLKeys={{ key: [googleMapsAPI] }}
  			defaultCenter={this.props.center}
  			defaultZoom={this.props.zoom}
  			style={mapStyles}
  		/>
  	);
  }
}

export default WordPressAcfMap;
