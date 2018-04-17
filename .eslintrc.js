module.exports = {
	parser: 'babel-eslint',
	env: {
		browser: true,
		es6: true,
	},
	settings: {
		ecmascript: 6,
		jsx: true,
	},
	parserOptions: {
		ecmaVersion: 2017,
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			experimentalDecorators: true,
			jsx: true,
		},
		sourceType: 'module',
	},
	plugins: ['react'],
	extends: 'airbnb',
	rules: {
		'react/jsx-filename-extension': 0,
		'function-paren-newline': 0,
		"indent": ["error", "tab"],
		'no-tabs': 0,
		'react/jsx-indent': 0,
		'no-console': 0,
		'jsx-a11y/anchor-is-valid': 0,
		'import/no-extraneous-dependencies': 0,
		'react/prop-type': 0,
		'react/no-danger': 0,
		"react/jsx-indent-props":[2, 'tab'],
		'no-return-assign': 0,
		'react/prefer-stateless-function': 0,
		'react/prop-types': 0,
		'no-underscore-dangle': 0,
		'class-methods-use-this': 0,
		'forbid-prop-types': 0
	},
};
