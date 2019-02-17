import React, { Component } from 'react';
import * as d3 from "d3";

export default class Exporter extends Component {

    constructor(props){
	super(props);
	this.state = {};
    	this.submitBlob = this.submitBlob.bind(this);
	this.updateDownloadLink = this.updateDownloadLink.bind(this);
    }
    

    _downloadTxtFile = () => {

    }

    updateDownloadLink(){

	// console.log(
	//     "Updating the downloadlink",
	//     JSON.parse(this.state.request.responseText)
	// );

	var fragment = JSON.parse(
		this.state.request.responseText
	)["target_file"];

	var embedUrl = 'https://projects.ctmirror.org/tools/new-tablemaker/' + fragment.slice(3);
	var embedCode = '[pym src="' + embedUrl + '"]';
	var rightEmbedCode = '[pym class="alignright" src="' + embedUrl + '"]';
	
	this.setState({
	    "downloadLink": embedCode,
	    "embedCode": embedCode,
	    "rightEmbedCode": rightEmbedCode,
	    "embedUrl": embedUrl
	});

    }

    submitBlob(){
 	var fileBlob = new Blob([this.props.html], {type: 'text/html'}),
	    filename = "test.html";
	
    	var url = "../submit/index.php",
	    form = new FormData(),
	    request = new XMLHttpRequest();
	
	form.append("blob", fileBlob, filename);

	request.open(
	    "POST",
	    url,
	    true
	);

	this.setState({"request":request});
	request.onload = this.updateDownloadLink;

	// function(resp){
	//     console.log("Received data from xhr response",
	// 		request.responseText,
	// 		JSON.parse(request.responseText)
	// 	       );
	// }
	
	request.send(form);

	
    };

    render() {
	var file = new Blob([this.props.html], {type: 'text/html'}),
	    blob = URL.createObjectURL(file);

	// console.log("blob", blob, this.props.html);
	// <a href="{URL.createObjectURL(file)}"
	
	return (
		<div>
		<button onClick={this.submitBlob}>upload</button>
		<h5>Full-width embed code:</h5>
		<code>
		{this.state.embedCode}		
		</code>
		
		<h5>Right-aligned embed code:</h5>
		<code>
		{this.state.rightEmbedCode}
		</code>

		<div>
		<a href={blob} download="chart.html">Download</a>
		</div>

		</div>
	);
    }
    
}
