import React, { Component } from 'react';

export default class Exporter extends Component {

    _downloadTxtFile = () => {

    }

    render() {
	var file = new Blob([this.props.html], {type: 'text/html'});
	
	return (
	    <div>
	    <a href={URL.createObjectURL(file)}
	    download="chart.html">
	    Download</a>
	    </div>
	);
    }
	
}
