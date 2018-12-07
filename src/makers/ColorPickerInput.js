import React, { Component } from 'react';
import GenericInput from "./GenericInput.js";

import { TwitterPicker } from 'react-color';

export default class ColorPickerInput extends GenericInput { 

    constructor(props){
	super(props);
	this.state = {
	    "mirrorColors":[
		'#B01B03',	// red
		'#FFDF40', // yellow
		'#999', // gray
		'#000' // black
	    ],
	    "twitterColors":[
		'#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC',
		'#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'
	    ]
	}
    }

    setValue(color){
	this.setValueRaw(color.hex);
    }
    

    render(){
	return (
	    <div>
	    <label>{this.props.name}</label>
	    <TwitterPicker
	    colors={ this.state.mirrorColors.concat( this.state.twitterColors ) }
	    color={ this.state.color }
	    onChangeComplete={this.setValue}
	    />
	    </div>
	);	    
    }
}
