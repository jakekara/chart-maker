import React, { Component } from 'react';
import GenericInput  from "./GenericInput.js";
// import ColorPickerInput from "./ColorPickerInput.js";
// import CheckBoxInput from "./CheckBoxInput.js";
import TextAreaInput from "./TextAreaInput.js";


export default class OptionsArea extends Component {

    constructor(props){
	super(props);
	this.state = {
	}

	this.renderOptions = this.renderOptions.bind(this);

	// this.setOptionKeyValue = this.setOptionKeyValue.bind(this); 
    }

    // setOptionKeyValue(k, v){
    // 	this.setState({k:v});
    // 	console.log("just set state", this.state, this.props);
    // 	console.log(this.props.callback);
    // 	this.props.callback(k, v);
    // }

    renderOptions(){
	return (
	    <div>
	    <form>
	    <TextAreaInput name="title"
	    value={(this.props.options||{title:""})["title"]}
	    label="Title"
	    callback={this.props.callback} />
	    <TextAreaInput name="explainer"
	    value={(this.props.options||{explainer:""})["explainer"]}	    
	    label="Explainer copy"
	    callback={this.props.callback} />
	    <TextAreaInput name="byline"
	    value={(this.props.options||{byline:""})["byline"]}	    
	    label="Byline"
	    callback={this.props.callback} />
	    <TextAreaInput name="sourceline"
	    value={(this.props.options||{sourceline:""})["sourceline"]}	    	    
	    label="Sourceline"
	    callback={this.props.callback} />
	    </form>
	    </div>
	);
    }
    
    render(){
	return (
	    <div>
	    <div>
	    <h3>{this.props.title}</h3>
	    </div>
	    {this.renderOptions()}
	    </div>
	);
    }
}


