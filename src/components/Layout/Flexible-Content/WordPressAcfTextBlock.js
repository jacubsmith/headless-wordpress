import React, { Component } from 'react';

class WordPressAcfTextBlock extends Component {
	render() {
		return (
			<div dangerouslySetInnerHTML={{
				__html: this.props.item.content,
			}}
			/>
		);
	}
}

export default WordPressAcfTextBlock;
