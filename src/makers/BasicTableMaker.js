import Expandable from 'react-expandable';
import React from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import DataFrame from "../data/tools.js";

import OptionsArea from "./OptionsArea.js";
import ColorPickerInput from "./ColorPickerInput";
import TextAreaInput from "./TextAreaInput";
import CheckBoxInput from "./CheckBoxInput";

import GenericMaker from "./GenericMaker.js";

class BasicTableOptions extends OptionsArea {

    constructor(props){

	super(props);

	this.renderOptions = this.renderOptions.bind(this);
	// this.renderColumnOption = this.renderColumnOption.bind(this);	
	this.renderColumnOptions = this.renderColumnOptions.bind(this);
	this.updateColor = this.updateColor.bind(this);
	this.onSortEnd = this.onSortEnd.bind(this);
    }

    updateColor(color){
	this.setState({"color":color.hex});
    }

    renderColumnOptions(c){
	var callback = this.props.callback;

	return (
	    <div key={'column-options-' + c} className="column-option-group">
	    <h5>'{c}'</h5>
	    
	    <CheckBoxInput 
		    callback={callback}
	    label={ "Hide"}
	    name={"hide-column-" + c} />

	    <CheckBoxInput 
		    callback={callback}
	    label={ "Bold"}
	    name={"bold-column-" + c} />
	    
	    <CheckBoxInput 
		    callback={callback}
	    label={ "Lighter"}
	    name={"light-column-" + c} />

	    <CheckBoxInput 
		    callback={callback}
	    label={ "Droppable"}
	    name={"droppable-column-" + c} />
	    
	    
	    <TextAreaInput
		    callback={callback}
	    label={ "Display name"}
	    name={"display-name-column-" + c} />
	    </div>
	);
    }

    // renderColumnOptions(){

    // 	// var callback = this.props.callback;
    // 	var columns = [];

    // 	if (this.props.data.length > 0){
    // 	    columns = Object.keys(this.props.data[0]).map(x => String(x));
    // 	}

    // 	// var renderColumnOption = this.renderColumnOption;
    // 	// var renderedColumnOptions = columns.map(this.renderColumnOption);

    // 	return (
    // 	    <div className="column-option-tray">
    // 	    {columns.map(this.renderColumnOption)}
    // 	    </div>	    
    // 	);

    // }

    onSortEnd({oldIndex, newIndex}){
	// var newOrder = arrayMove(this.state.df.columnOrder,
	//     oldIndex,
	//     newIndex
	// )

	// this.setState({
	//     "df":this.state.df.setColumnOrder(newOrder),
	// });

	// this.props.callback(
	//     "column-order",
	//     newOrder
	// );
    }
    
    renderOptions(){

	var columnNames = this.props.data.columns;	
	
	var ret = <div>
	<h3>Table options</h3>
	<form>

	<ColorPickerInput
	value="#999"
	callback={this.props.callback}
	label="Header background color"
	name="table-header-background" />
	
	<CheckBoxInput
	value={true}
	callback={this.props.callback}
	name="table-sm"
	label="compact table style" />
	
	<div className="column-option-tray">
	{(columnNames || []).map(this.renderColumnOptions)}
	</div>
	</form>
	</div>;
	return [super.renderOptions(), ret];
    }

}

export default class BasicTableMaker extends GenericMaker {

    constructor(data, options){

	super(...arguments);

	this.optionsArea = BasicTableOptions;
	
    }

    scriptTag(){
	return '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">'
	+ '<script type="text/javascript" src="https://pym.nprapps.org/pym.v1.min.js"></script>'
	    // + '<script src="http://localhost:8000/TDEV/chart-tool/lib/basic-table.js"></script>'
	+ '<script src="https://projects.ctmirror.org/tools/new-tablemaker/lib/basic-table.js"></script>'	
	// + '<script src="./lib/basic-table.js"></script>'	
	+ '<script>'
	+ 'var obj = ' + JSON.stringify(this.data) + ';'
	+ 'obj.columns = ' + JSON.stringify(this.data.columns) + ";"
	+ 'new BasicTable('
	+ '"root",'
	+ 'obj,'
	    + JSON.stringify(this.options) + ").draw();"
	    + "new pym.Child();"
	    + "pym.Child({ polling: 500 });"
	+ '</script>';

	
    }

    name() { return "Table"; }

    description(){
	return "Better than a list."
    }
    
}

// export default BasicTable;
