
function event (body, start, end, byday){
	
	this.body = body;
	this.start = start;
	this.end = end;
	this.byday = byday;

	return this;
}

 function getAsText(fileToRead) {
    var reader = new FileReader();
    // Handle errors load
    reader.onload = loadHandler;
    // Read file into memory as UTF-8      
    return reader.readAsText(fileToRead);
}

function parse(text){
	var k, i;
	var x = text.split('END:VTIMEZONE');
	var z = x[1].split('BEGIN:VEVENT');
	var s = [];
	var e = [];
	var p = [];
	var t = [];
	var l = [];
	var b = [];
	var events = [];
	var days = ['MO','TU','WE','TH','FR','SA','SU'];
	for(i = 0; i<z.length; i++){
		p = z[i].split('\n');
		t = p[4].split('T');
		l = t[t.length - 1];
		s[i] = l;
	}
	for(i = 0; i<z.length; i++){
		p = z[i].split('\n');
		t = p[5].split('T');
		l = t[t.length - 1];
		e[i] = l;
	}
	for(i = 0; i<z.length; i++){
		p = z[i].split('\n');
		t = p[6].split('=');
		l = t[t.length - 1];
		for(k = 0; k<7; k++){
			if(l == days[k]){
				l = k;
			}
		}
		b[i] = l;
	}
	for(i = 0; i<z.length; i++){
		events[i] = event(z[i],s[i],e[i],b[i]);
	}
	return events;
}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function time(events){
var i, d;
var a = createArray(24, 7);
for(i=0; i<events.length; i++){
	d = events[i].end - events[i].start


	a[((events[i].start)/10000)-1.3][events[i].byday] = events[i].body;


}

return a;
}

function uniqueEvents (array) {
	var distinct = []
	for (i= 0, i < 7, i++) 
	{
		for(var j =0; j<24, j++)
		{
			if (array[j] not in distinct)
				distinct.push(array[i])
		}
	}
return distinct;
}



function compile(events){
	var i = 0;
	var calendarEvents = ['BEGIN:VEVENT'];
for(i = 0; i<events.length; i++){
	calendarEvents.push('BEGIN:VEVENT' + events[i].body);
}	

var calendarStart =['BEGIN:VCALENDAR',
					'VERSION:2.0'];
var calendar = calendarStart + '\n' + calendarEvents;
ext = (typeof ext !== 'undefined') ? ext : '.ics';
filename = (typeof filename !== 'undefined') ? filename : 'calendar';
var blob;
	if (navigator.userAgent.indexOf('MSIE 10') === -1) { // chrome or firefox
		blob = new Blob([calendar]);
		} else { // ie
        	 var bb = new BlobBuilder();
             bb.append(calendar);
             blob = bb.getBlob('text/x-vCalendar;charset=' + document.characterSet);
            }
    saveAs(blob, filename + ext);

}

