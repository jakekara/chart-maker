import LivePreview from "./LivePreview";
import React, { Component } from 'react';

export default class TemplatePicker extends Component {

    constructor(props){
	super(props);
	this.state = {
	    "selectedTemplate":this.props.defaultTemplate
	}
	this.selectTemplate = this.selectTemplate.bind(this);
    }

    selectTemplate(i){
	this.setState({"selectedTemplate":i})
	this.props.callback(i);
    }

    render(){
	var selected = this.state.selectedTemplate;
	var selectTemplate = function(i){
	    this.selectTemplate(i);
	}.bind(this);
	var templates = this.props.templates,
	data = this.props.data,
	options = this.props.options;
	
	
	return (
	    <div>
	    <h3>What kind of viz do you want to make?</h3>
	    <div className="picker-tray">
	    {templates.map(function(a, i){
		var tmp = new a(data, options);
		var className = "picker-preview";
		if (i === selected){ className += " selected";}
		return <div id={tmp.name()}
		key={"picker-" + tmp.name()}
		onClick={function(){selectTemplate(i);}}
		className={className}>
		    <h5>{tmp.name()}</h5>
		<div>{tmp.description()}</div>
		</div>;
	    })}
	    </div>
	    </div>
	);
    }
}
