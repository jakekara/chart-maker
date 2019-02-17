// import React from 'react';
import  OptionsArea, {CheckBox} from "./OptionsArea.js";

class GenericOptions extends OptionsArea {
    constructor(props){
	super(props);
	this.renderOptions = this.renderOptions.bind(this);
    }
}

export default class GenericMaker {

    constructor(data, options){
	this.data = data || [];
	this.options = options || {};

	this.optionsArea = GenericOptions;	
	this.renderHTML = this.renderHTML.bind(this);
	this.exportHTML = this.exportHTML.bind(this);
    }

    exportHTML(){
	return this.renderHTML(false);
    }

    name(){
	return "NoViz";
    }

    description(){
	return "A viz with no viz";
    }

    scriptTag(){
	return "";
    }

    renderHTML(){

	function ifSomething(something, thenThis, otherwiseThis){
	    if (something && something.length > 0){ return thenThis; }
	    return otherwiseThis;
	}

	var title = ifSomething(
	    this.options.title,
	    "<h3>" + this.options.title + "</h3>",
	    "");

	var explainer = ifSomething(
	    this.options.explainer,
	    "<p>" + this.options.explainer + "</p>",
	    "");

	var sourceline = ifSomething(
	    this.options.sourceline,
	    "<div class='sourceline'>" + this.options.sourceline + "</div>",
	    "");

	var byline = ifSomething(
	    this.options.byline,
	    "<div class='byline'>" + this.options.byline + "</div>",
	    "")

	var ret = "<!DOCTYPE HTML>"
	    + "<html>"

	ret += "<head>"
	    + "<meta charset=utf-8>"
	    + "</head>"
	
	ret +=  "<body>"
	+ title
	+ explainer

	ret += '<link rel="stylesheet" href="https://projects.ctmirror.org/tools/new-tablemaker/lib/style.css"></script>'	
	// ret += '<link rel="stylesheet" href="http://localhost:8000/TDEV/chart-tool/lib/style.css"></script>'
	// ret += '<link rel="stylesheet" href="./lib/style.css"></script>'	

	// ret += '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">'

	// ret += '<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>'
	
	ret += '<script src="https://d3js.org/d3.v5.min.js"></script>'

	ret += "<div id='root'></div>"

	ret += byline
	ret += sourceline
	
	ret += ""
	+ "<!-- import libraries here -->"

	ret += this.scriptTag();

	ret += "</body>";

	ret += "</html>";

	return ret;
	
    }
    
}
