
//Test for IE6 and under and add 'ie6' class to body tag.
if (YAHOO.env.ua.ie > 0 && YAHOO.env.ua.ie < 7) {
	YAHOO.util.Dom.addClass(YAHOO.util.Dom.getElementsBy(function(el){return true;},'body'), 'ie6');
}


//This prototype is provided by the Mozilla foundation and
//is distributed under the MIT license.
//http://www.ibiblio.org/pub/Linux/LICENSES/mit.license
if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
	var len = this.length;

	var from = Number(arguments[1]) || 0;
	from = (from < 0)
		 ? Math.ceil(from)
		 : Math.floor(from);
	if (from < 0)
	  from += len;

	for (; from < len; from++)
	{
	  if (from in this &&
		  this[from] === elt)
		return from;
	}
	return -1;
  };
}