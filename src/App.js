/**
 * App
 */

// Installed packages
import React, { Component } from 'react';

// // Chartmaker.maker components
// import GenericMaker from "./makers/GenericMaker.js";
import BasicTableMaker from "./makers/BasicTableMaker.js";
// import GroupedBarMaker from "./makers/GroupedBarMaker.js";

// // Chartmaker.backend components
import ChartMakerBackend from "./backend/ChartMakerBackend.js"

export default class App extends Component {

    render(){
	return (
	    <ChartMakerBackend
	    templates={[
	    	// GenericMaker,
		BasicTableMaker,
	    	// BasicTableMaker,
	    	// GroupedBarMaker
	    ]} />
	);
	
    }
}

