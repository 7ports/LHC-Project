function parse(text){
	var x = text.split('END:VTIMEZONE');
	var z = x[1].split('BEGIN:VEVENT');
	var d = new Date();
	d.getDay();
}