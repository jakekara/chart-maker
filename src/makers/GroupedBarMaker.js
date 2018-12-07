import BasicTableMaker from "./BasicTableMaker.js";

export default class GroupedBarMaker extends BasicTableMaker {

    description(){ return "A basic bar chart. Is there anything it can't do?"; }

    scriptTag(){
	return '<script src="http://localhost:8000/TDEV/chart-tool/lib/grouped-bar.js"></script>'	
	+ '<script>new GroupedBar('
	+ '"root",'
	+ JSON.stringify(this.data) + ","
	+ JSON.stringify(this.options) + ").draw();"
	+ '</script>';

	
    }	

}

