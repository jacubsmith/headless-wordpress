import React, { Component } from 'react';

class WordPressAcfWysiwyg extends Component {
	render() {
		return (
			<div
				className="editor"
				dangerouslySetInnerHTML={{
					__html: this.props.item.editor,
				}}
			/>
		);
	}
}

export default WordPressAcfWysiwyg;
