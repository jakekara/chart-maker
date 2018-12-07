import * as d3 from "d3";
import React, { Component } from 'react';

import TextAreaInput from "../makers/TextAreaInput";

export default class DataImporter extends Component {

    constructor(props){
	super(props);
	
	this.state = {
	    "rows":10,
	    "sheetData":[],
	    "dataStatus":"No data"
	};

	this.onSheetChange = this.onSheetChange.bind(this);
    }

    onSheetChange(_, dataString){

	console.log("sheetData", dataString);
	
	if (!dataString){return;}

	// e.preventDefault();

	// convert text to sheet
	var data = d3.tsvParse(dataString);

	// update internal state
	this.setState({"sheetData": data});

	if (data.length > 0){
	    this.setState({
		"dataStatusClass":"good-data",
		"dataStatus":"Recognized " + data.length + " rows of data."
	    });
	}
	else{
	    this.setState({
		"dataStatusClass":"bad-data",
		"dataStatus":"Data format not recognized."
	    });
	}

	// call parent call back 
	this.props.callback(data);
	
    }
    
    render(){
	return (
	    <div>
	    <h3>Copy and paste your spreadsheet below</h3>
	    
	    <TextAreaInput 
	    rows={this.state.rows}
	    callback={this.onSheetChange}
	    name="sheet-data"
	    defaultValue={this.props.defaultData}
	    value={this.state.sheetValue}
	    className="spreadsheet-input" />

	    <div className={"data-status " +  this.state.dataStatusClass}> 
	    {this.state.dataStatus}
	    </div>
	    
	    </div>
	);
    }
}
