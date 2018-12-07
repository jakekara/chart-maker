function BasicTable(divId, data, options){
    this.selection = d3.select("#" + divId);
    this.data = data;
    this.options = options;
    
    this.draw = this.draw.bind(this);
    this.sortTable = this.sortTable.bind(this);

    this.sortColumnIndex = null;
    this.sortOrderAscending = true;

}

BasicTable.prototype.sortTable = function(columnIndex) {

    // code for this function heavily based on
    // https://www.w3schools.com/howto/howto_js_sort_table.asp
    
    var table, rows, switching, i, x, y, shouldSwitch;

    if (columnIndex == this.sortColumnIndex){
	this.sortOrderAscending = !this.sortOrderAscending;
    } else {
	this.sortColumnIndex = columnIndex;
	this.sortOrderAscending = true;
    }

    this.thead.selectAll("th")
	.classed("sort", false)
	.classed("ascending", false);

    var th =this.thead.selectAll("th")["_groups"][0][this.sortColumnIndex]
    d3.select(th)
    	.classed("sort", true)
    	.classed("ascending", this.sortOrderAscending)
    	.classed("descending", !this.sortOrderAscending);
    
    table = this.tbody.node(); //d3.select(this.parentNode.parentNode).select("tbody").node();
    switching = true;
      /* Make a loop that will continue until
	 no switching has been done: */
    while (switching) {
	// Start by saying: no switching is done:
	switching = false;
	rows = table.rows;
	    /* Loop through all table rows (except the
	       first, which contains table headers): */
	for (i = 0; i < (rows.length - 1); i++) {
	    // Start by saying there should be no switching:
	    shouldSwitch = false;
	          /* Get the two elements you want to compare,
		     one from current row and one from the next: */

	    if (this.sortOrderAscending){
		x = rows[i].getElementsByTagName("td")[this.sortColumnIndex];
		y = rows[i + 1].getElementsByTagName("td")[this.sortColumnIndex];
	    } else {
		y = rows[i].getElementsByTagName("td")[this.sortColumnIndex];
		x = rows[i + 1].getElementsByTagName("td")[this.sortColumnIndex];
	    }
	    
	    // Check if the two rows should switch place:
	    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
		// If so, mark as a switch and break the loop:
		shouldSwitch = true;
		break;
	    }
	}
	if (shouldSwitch) {
	          /* If a switch has been marked, make the switch
		     and mark that a switch has been done: */
	    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
	    switching = true;
	}
    }
}

BasicTable.prototype.draw = function(){

    if (this.data.length < 1) { return ;}

    this.selection.html("");

    var rect = this.selection.node().getBoundingClientRect(),
	width = rect.width,
	height = rect.height;

    // create the table
    this.table = this.selection.append("table")
	.classed("table", true)
	.classed("table-dark", this.options["table-dark"])
	.classed("table-sm", this.options["table-sm"])
	.classed("table-striped", this.options["table-striped"])
    this.thead = this.table.append("thead");
    this.tbody = this.table.append("tbody");

    if (this.data.length < 1){ return this ;}
    var columnNames = Object.keys(this.data[0]);

    var options = this.options;
    var headerBackground = this.options["table-header-background"];
    var columnDisplayName = function(c){
	return options["display-name-column-" + c] || c;
    };

    // helpers
    var showColumn = function(c){ return !options["hide-column-" + c]; }
    var boldColumn = function(c){
	return options["bold-column-" + c];}
    var lightColumn = function(c){ return options["light-column-" + c];}
    var droppableColumn = function(c){ return options["droppable-column-" + c];}        

    // var displayColumns = (this.options["column-order"] || columnNames)
    var displayColumns = (this.data.columns) // || columnNames)    
	.filter(showColumn);

    // add column headers
    var sortFunc = this.sortTable,
	sortColumn = this.sortColumnIndex,
	sortAscending = this.sortOrderAscending;
	
    this.columnHeaders = this.thead.selectAll("th")
	.data(displayColumns)
	.enter()
	.append("th")
	.on("click", function(_, i){ sortFunc(i);})
	.classed("droppable", droppableColumn)
	.classed("light-cell", lightColumn)
	.classed("bold-cell", boldColumn)
	.style("border-bottom", "2px solid " + String(headerBackground))        
	// .style("background-color", headerBackground)
	// .style("border-bottom", headerBackground)    
	.html(function(a, i){
	    var ret = ""

	    ret += '<span class="sort-icon ascending">'
		+ '<i class="fa fa-sort-asc" aria-hidden="true"></i></span>';

	    ret += '<span class="sort-icon descending">'
		+ '<i class="fa fa-sort-desc" aria-hidden="true"></i></span>'

	    ret += "<span>" + columnDisplayName(a) + "</span>";
	    
	    return ret;
	});

    // add each row
    this.rows = this.tbody.selectAll("tr")
	.data(this.data)
	.enter()
	.append("tr");

    var getCell = function(row, column){
	return this.data[row][displayColumns[column]];
    }.bind(this);

    this.cells = this.rows.selectAll("td")
	.data(function(_, r){
	    return displayColumns.map(function(_, i){
		var c = displayColumns[i];
		return {
		    "text":getCell(r, i),
		    "bold":boldColumn(c),
		    "light":lightColumn(c),
		    "droppable":droppableColumn(c)
		};
	    })
	})
	.enter()
	.append("td")
	.classed("bold-cell", function(a){ return a.bold})
	.classed("light-cell", function(a){ return a.light})
	.classed("droppable", function(a){ return a.droppable})        
	.text(function(a){ return a.text;});
			   
        
}
