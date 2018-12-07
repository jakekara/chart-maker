import React, { Component } from 'react';

export default class LivePreview extends Component {

    render(){
	return (
	    <div>
	    <h3>{"Here's your viz so far"}</h3>
		<iframe
	    width={this.props.width}
	    height={this.props.height}
	    frameBorder="0"
	    title={this.props.title}
	    srcDoc={"<div class='preview'>" + this.props.html + "</div>"}>
	    </iframe>
	    </div>
	);
    }
}
