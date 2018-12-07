export default class DataFrame {

    constructor(matrix){
	this.rows = (matrix || []).map(this.cleanRow);
	this.columnOrder = this.columnNames();
    }

    cleanRow(row){

	// coerce keys to strings 
	
	var keys = Object.keys(row);
	var ret = {}
	keys.forEach(c => ret[String(c)] = row[c]);
	return ret;
    }

    setColumnOrder(arr){

	var ret = [];
	var cols = this.columnNames();
	
	if(arr.length !== cols.length){
	    throw "Invalid array length";
	}

	arr.forEach(function(c){
	    if (!cols.includes(c)){
		throw "Invalid column name: '" + c + "'";
	    }

	    ret.push(c);
	});

	this.columnOrder = ret;
	return this;
	
    }
    
    columnNames(){
	if (this.rows.length < 1){ return []; }
	return Object.keys(this.rows[0]);
    }
    
}
