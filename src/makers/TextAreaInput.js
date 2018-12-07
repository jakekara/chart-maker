import React, { Component } from 'react';
import GenericInput from "./GenericInput.js";

export default class TextAreaInput extends GenericInput{

    constructor(props){
	super(props);
    }
    
    render(){
	return (
	    <div className="form-group">
	    <label>{this.props.label}
	    <textarea
	    rows={this.props.rows}
	    onChange={this.setValue}
	    value={this.state.value}></textarea>
	    </label>		
	    </div>
	);
    }
}
