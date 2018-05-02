const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const slash = require('slash');

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for WordPress pages (route : /{slug})
// Will create pages for WordPress posts (route : /post/{slug})
exports.createPages = ({ graphql, boundActionCreators }) => {
	const { createPage } = boundActionCreators;
	return new Promise((resolve, reject) => {
		// The “graphql” function allows us to run arbitrary
		// queries against the local WordPress graphql schema. Think of
		// it like the site has a built-in database constructed
		// from the fetched data that you can run queries against.

		// ==== PAGES (WORDPRESS NATIVE) ====
		graphql(
			`
        {
          allWordpressPage {
            edges {
              node {
                id
                slug
                status
                wordpress_id
              }
            }
          }
          wordpressAcfOptions {
            home_page {
              wordpress_id
            }
          }
        }
      `,
		)
			.then((result) => {
				if (result.errors) {
					console.log(result.errors);
					reject(result.errors);
				}

				const homeID = result.data.wordpressAcfOptions.home_page.wordpress_id;
				// Create Page pages.
				// We want to create a detailed page for each
				// page node. We'll just use the WordPress Slug for the slug.
				// The Page ID is prefixed with 'PAGE_'
				_.each(result.data.allWordpressPage.edges, (edge) => {
					// Render index as home page if it has the right wordpress_id as set in options
					const templatePath =
					  edge.node.wordpress_id === homeID
					  	? 'templates/index.jsx'
					  	: 'templates/page.jsx';

					const pageTemplate = path.resolve(`./src/${templatePath}`);

					// Gatsby uses Redux to manage its internal state.
					// Plugins and sites can use functions like "createPage"
					// to interact with Gatsby.
					createPage({
						// Each page is required to have a `path` as well
						// as a template component. The `context` is
						// optional but is often necessary so the template
						// can query data specific to each page.
						path: `/${edge.node.slug}/`,
						component: slash(pageTemplate),
						context: {
							id: edge.node.id,
						},
					});
				});
			})
		// ==== END PAGES ====
		// ==== FILMS (CUSTOM POST TYPE = FILMS) ====
			.then(() => {
				graphql(
					`
            {
              allWordpressWpFilms {
                edges {
                  node {
                    title
                    slug
                    type
                    id
                  }
                }
              }
            }
          `,
				).then((result) => {
					if (result.errors) {
						console.log(result.errors);
						reject(result.errors);
					}
					const movieTemplate = path.resolve('./src/templates/movie.jsx');
					// We want to create a detailed page for each
					// post node. We'll just use the WordPress Slug for the slug.
					// The Post ID is prefixed with 'POST_'
					_.each(result.data.allWordpressWpFilms.edges, (edge) => {
						createPage({
							path: `/${edge.node.slug}/`,
							component: slash(movieTemplate),
							context: {
								id: edge.node.id,
							},
						});
					});
					resolve();
				});
			})
		// ==== POSTS (WORDPRESS NATIVE AND ACF) ====
			.then(() => {
				graphql(
					`
            {
              allWordpressPost {
                edges {
                  node {
                    id
                    slug
                    status
                    format
                    tags {
                      name
                    }
                  }
                }
              }
            }
          `,
				).then((result) => {
					if (result.errors) {
						console.log(result.errors);
						reject(result.errors);
					}
					const tags = [];
					const postTemplate = path.resolve('./src/templates/post.jsx');
					// We want to create a detailed page for each
					// post node. We'll just use the Wordpress Slug for the slug.
					// The Post ID is prefixed with 'POST_'
					_.each(result.data.allWordpressPost.edges, (edge) => {
						// grab all the tags and categories for later use
						edge.node.tags.forEach((tag) => {
							tags.push(tag.name);
						});

						createPage({
							path: `/${edge.node.slug}`,
							component: slash(postTemplate),
							context: {
								id: edge.node.id,
							},
						});
					});
					// ==== END POSTS ====

					// Create pages for each unique tag and category
					const tagsTemplate = path.resolve('./src/templates/tag.jsx');
					const tagsSet = new Set(tags);
					tagsSet.forEach((tag) => {
						createPage({
							path: `/tags/${_.kebabCase(tag)}/`,
							component: slash(tagsTemplate),
							context: {
								id: tag,
							},
						});
					});

					resolve();
				});
			});
		// ==== END POSTS ====
	});
};
