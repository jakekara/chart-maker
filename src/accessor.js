function addAccessor(ctx, name, defaultValue){

    function sym(name){ return "__" + name; }
    
    ctx[sym(name)] = defaultValue;

    ctx[name] = function(value){
	if (!value){
	    return ctx[sym(name)];
	}
	ctx[sym(name)] == value;
	return ctx;
    }
	
}


