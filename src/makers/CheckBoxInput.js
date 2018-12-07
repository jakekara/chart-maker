/**
 * Represent a checkbox
 */

import React, { Component } from 'react';
import GenericInput  from "./GenericInput.js";

export default class CheckBoxInput extends GenericInput {

    constructor(props){
	super(props);
	this.setValue = this.setValue.bind(this);
	props.callback(this.props.name, this.state.value || false);
    }

    setValue(e){
	// this.setState({"checked":e.target.checked});
	this.setValueRaw(e.target.checked);
	
    }

    render(){

	return (
	    <div>
		<input
	    checked={this.state.value || false}
	    onChange={this.setValue}
	    type="checkbox"></input>		
	    <label>{this.props.label}
	    </label>		
	    </div>
	);
    }
    
}
