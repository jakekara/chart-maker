/**
 * Store and pass input values back up through callback.
 */

import React, { Component } from 'react';

export default class GenericInput extends Component {

    /** 
     * @constructor
     * args:
     *          props.name:string     - The name/key corresponding to the value 
     *                                  this input tracks  
     *      props.callback:object->() - A function to call whenever the value is 
     *                                  changed
     *         props.value:object     - The default/starting value
     */
    constructor(props){
	super(props);

	this.state = {
	    "value":props.value
	};

	this.setValueRaw = this.setValueRaw.bind(this);
	this.setValue = this.setValue.bind(this);

	this.props.callback(props.name, props.value);	
    }

    /**
     * Set the Component's state.value to a given value and fire callback
     * args:
     *     v:obj - The new value to store
     */
    setValueRaw(v){
	this.setState({"value":v});
	this.props.callback(this.props.name, v);
    }

    /**
     * Set the component's state.value from a given event
     * args:
     *    e:event - The event to pull e.target.value from 
     */
    setValue(e){
	this.setValueRaw(e.target.value);
    }
    
}
