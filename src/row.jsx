import React, { Component } from 'react';

export default class Tile extends Component {
	tileClick(props) {
		props.updateBoard(props.row, props.column, props.walking); 
	}

	getText(props) {
		console.log('get', props);
		switch(props) {
			case '1': return 'x';
			case '-1': return 'o';
			default: return '';
		}
	}


	render() {
		return (
			<div className={"tile" + this.props.loc}  onClick={() => this.tileClick(this.props)}>
				<p> {this.getText(this.props.value)} </p>
			</div>
			)
	}
}