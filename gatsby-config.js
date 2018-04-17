const autoprefixer = require('autoprefixer');
const browserslist = require('browserslist');

module.exports = {
	siteMetadata: {
		title: 'Headless Wordpress',
		desc: 'Simple Headless Wordpress using Gatsby JS',
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			resolve: 'gatsby-plugin-postcss-sass',
			options: {
				postCssPlugins: [
					autoprefixer({
						browsers: browserslist(),
					}),
				],
			},
		},
		'gatsby-transformer-remark',
		'gatsby-image',
		{
			resolve: 'gatsby-source-wordpress',
			options: {
				/*
			* The base URL of the Wordpress site without the trailingslash and the protocol. This is required.
			* Example : 'gatsbyjsexamplewordpress.wordpress.com' or 'www.example-site.com'
			*/
				baseUrl: 'vps534672.ovh.net',
				// The protocol. This can be http or https.
				protocol: 'http',
				// Indicates whether the site is hosted on wordpress.com.
				// If false, then the asumption is made that the site is self hosted.
				// If true, then the plugin will source its content on wordpress.com using the JSON REST API V2.
				// If your site is hosted on wordpress.org, then set this to false.
				hostingWPCOM: false,
				// If useACF is true, then the source plugin will try to import the Wordpress ACF Plugin contents.
				// This feature is untested for sites hosted on Wordpress.com.
				// Defaults to true.
				useACF: true,
				verbose: true,
			},
		},
	],
};
