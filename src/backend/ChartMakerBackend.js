/**
 * ChartMakerBackend 
 * 
 */

// installed packages
import React, { Component } from 'react';

// Chartmaker core tools
import DataFrame from "../data/tools.js";

// ChartMaker.backend Components
import DataImporter from "./DataImporter.js";
import TemplatePicker from "./TemplatePicker.js";
import LivePreview from "./LivePreview.js";
import Exporter from "./Exporter.js";

// Assets
import logo from "../logo.svg";
import './ChartMaker-backend.css'; 

export default class ChartMakerBackend extends Component {

    constructor(props){
	super(props);

	this.state = {
	    "selectedTemplate":0,
	};

	this.handleTemplate = this.handleTemplate.bind(this);
	this.handleData = this.handleData.bind(this)
	this.getCurrentTemplate = this.getCurrentTemplate.bind(this);
	this.setOptionKeyValue = this.setOptionKeyValue.bind(this);
    }

    handleTemplate(i){
    	this.setState({
	    "selectedTemplate":i,
	    "currentTemplate":this.props.templates[i]
    	});
    }
    
    handleData(d){

    	this.setState({
	    "sheetData":d,
	});
    }

    getCurrentTemplate(){
	// expects data:array and options:object
    	return new this.props.templates[this.state.selectedTemplate](...arguments);
    }

    setOptionKeyValue(k, v){
    	var options = {...this.state["options"]}
    	options[k] = v;
    	this.setState(Object.assign(this.state, {options}),() => {
	});

    }
    
    render() {

    	var temp = this.getCurrentTemplate(
	    this.state.sheetData,
    	    // (new DataFrame(this.state.sheetData).rows || []),
    	    (this.state.options || {})
    	)

    	return (
    	    <div className="App">
	    
	    <div className="banner">
	    <img className="logo" src={logo} />
	    <div className="banner-text">
	    CT Mirror ChartMaker
	    </div>
	    </div>
	    
	    <div className="split">
	    
	    <div className="left-side">
	    
    	    <DataImporter
	    callback={this.handleData}
	    defaultData="Copy and paste from a spreadsheet" />

    	    <TemplatePicker
    	    defaultTemplate={this.selectedTemplate}
    	    callback={this.handleTemplate}
	    data={this.state.sheetData}
	    options={this.state.options || {}}
    	    templates={this.props.templates} />
	    
    	    <temp.optionsArea
    	    data={this.state.sheetData || []}
    	    options={this.state.options}
    	    callback={this.setOptionKeyValue}	    
    	    title="Viz options"/>
	    
	    </div>
	    
	    <div className="right-side">

	    <LivePreview
	    width={"100%"}
	    height={400}
    	    html={ temp.renderHTML(true)}
    	    sheetData={this.state.sheetData} />

	    <Exporter html={ temp.exportHTML() } />
	    
    	    </div>
	    </div>
	    </div>

    	);
    }
}
