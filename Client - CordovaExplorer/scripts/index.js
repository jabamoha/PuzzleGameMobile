// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";
	var FlagUse = false, FreeIndex = 15 , socket;
    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
       		 socket = io("http://localhost:12345");

socket.on('toClient message', function(msg){
	
	if (msg.length > 30 && FlagUse == false){	
		FlagUse = true;
        var new_tbody = $("<tbody>");
        var counter = 0;
		var arrN =  msg.split('/')[0].split('*');
		var arrC =  msg.split('/')[1].split('*');
        for (var r = 0; r < 4; r++) {
            var new_row = $("<tr>");
            for (var c = 0; c < 4; c++) {
                var new_cell = $("<td>");
                var myButton = $("<button  id='" + counter + "'>OK</button>");
                myButton.text(arrN[counter]);
                myButton.attr('tabindex', (counter+1) * 100);
                myButton.css('width', '60px');
                $(myButton).click(myClick);
                myButton.css('height', '60px');
                myButton.appendTo(new_cell);
				myButton.css('backgroundColor', arrC[counter]);
                new_cell.appendTo(new_row);
				
				if (counter == 15)
					myButton.css('visibility', 'hidden');
                counter++;
            }
            new_row.appendTo(new_tbody);
        }
        new_tbody.appendTo($("#myTable"));
		document.body.style.backgroundColor = 'rgb(' + 256 + ',' + 256 + ',' + 256 + ')';
	}
	else
	{
		if (msg != 5 && msg.length > 10 && msg.length < 30){

				var index = msg.split('*')[1];
				var indexE = msg.split('*')[2];
				
				var buttonU = document.getElementById(index);
				var buttonE = document.getElementById(indexE);
				
				$(buttonU).css('visibility','hidden');
				$(buttonE).css('visibility','visible');
				
				buttonE.innerText = buttonU.innerText;
				buttonE.style.backgroundColor = buttonU.style.backgroundColor;
				document.body.style.backgroundColor = msg.split('*')[0];
				FreeIndex = index;
			

			   if (CheckWinner()) {
				   setTimeout(function () {
					   alert('Game Over, Click here to restart');
					   socket.emit('toServer message', 'MakeNewGame'); 
					   $(":button").remove();
					   FlagUse = false;
					   FreeIndex = 15;
				   }, 500);
			   }
		}		
	}
}); 
};
	
	
	function myClick() {
        var indexE = parseInt(FreeIndex);
        var index = parseInt(event.srcElement.id);
        var flagred = true;
		var msg1 = index + '*' + indexE + '/' + event.srcElement.style.backgroundColor + '*' + document.body.style.backgroundColor;
		socket.emit('toServer message', msg1); 
	}

	    function CheckWinner() {
        for (var i = 0 ; i < 1  ; i++)
            if (document.getElementById(i).innerText != (i + 1))
                return false;
        return true;
    }

})();