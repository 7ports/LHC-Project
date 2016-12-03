function compile(events){
	var i = 0;
	var calendarEvents = [];
for(i = 0; i<events.length; i++){
	calendarEvents.push(events[i].body);
}	

var calendarStart = 
var calendarEnd = 
var calendar = calendarStart + '\n' + calendarEvents + '\n' + calendarEnd;
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

